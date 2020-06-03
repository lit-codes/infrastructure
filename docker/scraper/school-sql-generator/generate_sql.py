#!/usr/bin/env python3

import os
import sys
import json
from base64 import b64decode
import psycopg2
from redis import Redis

def enterSchool(db, school):
    departments = school['departments']
    ratings = school['ratings']

    db.run("INSERT INTO school VALUES (%(legacyId)s, %(name)s, %(state)s, %(city)s) on conflict do nothing", school)

    for rating in ratings:
        rating['schoolId'] = school['legacyId']
        rating['crTimestamp'] = int(rating['crTimestamp'] / 1000)
        db.run("""
            INSERT INTO school_ratings (
                id,
                condition,
                location,
                career_opportunities,
                events,
                comment,
                creation_date,
                food,
                internet,
                library,
                reputation,
                safety,
                satisfaction,
                activities,
                status,
                time,
                helpful_votes,
                not_helpful_votes,
                school_id
            ) VALUES (
                %(id)s,
                %(crCampusCondition)s,
                %(crCampusLocation)s,
                %(crCareerOpportunities)s,
                %(crClubAndEventActivities)s,
                %(crComments)s,
                %(crCreateDate)s,
                %(crFoodQuality)s,
                %(crInternetSpeed)s,
                %(crLibraryCondition)s,
                %(crSchoolReputation)s,
                %(crSchoolSafety)s,
                %(crSchoolSatisfaction)s,
                %(crSocialActivities)s,
                %(crStatus)s,
                to_timestamp(%(crTimestamp)s),
                %(helpCount)s,
                %(notHelpCount)s,
                %(schoolId)s
            ) on conflict do nothing
        """, rating)

    for department in departments:
        db.run("INSERT INTO department VALUES (%(id)s, %(name)s) on conflict do nothing", department)
        db.run("INSERT INTO school_departments VALUES (%s, %s) on conflict do nothing", (school['legacyId'], department['id']))

class FileDB:
    def __init__(self):
        self.query = ''
    def mogrify(self, query, params):
        if isinstance(params, dict):
            params_copy = params.copy()
            for key in params_copy:
                if isinstance(params_copy[key], dict) or isinstance(params_copy[key], list):
                    continue
                params_copy[key] = psycopg2.extensions.adapt(params_copy[key]).getquoted().decode('utf8')
        else:
            params_copy = params
        return query % params_copy
    def run(self, query, params=()):
        if 'comment' in params:
            params['comment'] = params['comment'].replace('\x00', ' ')
        self.query += self.mogrify(query, params) + ';\n'
    def get(self):
        return self.query

if __name__ == '__main__':
    redis_host = os.environ.get('REDIS_HOST') or 'shared-redis'
    redis_port = os.environ.get('REDIS_PORT') or 6379
    db = FileDB()
    redis = Redis(host=redis_host, port=redis_port)
    while True:
        payload = json.loads(redis.brpop(['school_ratings'], timeout = 0)[1])
        schoolId = payload['legacyId']
        try:
            print('School added: %s' % schoolId, flush=True)
            enterSchool(db, payload)
            redis.lpush('school_rating_sqls', db.get())
        except Exception as e:
            print('Failed adding school %s, error is: %s' % (schoolId, str(e)), flush=True)
            redis.lpush('failed_school_rating_sqls', db.get())
