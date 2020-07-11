cube(`SchoolRatings`, {
  sql: `SELECT * FROM public.school_ratings`,
  
  joins: {
    School: {
      sql: `${CUBE}.school_id = ${School}.id`,
      relationship: `belongsTo`
    }
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, creationDate]
    }
  },
  
  dimensions: {
    badRating: {
      type: `boolean`,
      case: {
        when: [
          { sql: `${CUBE}.comment like '%bad%'`, label: `t` },
          { sql: `${CUBE}.comment like '%sh*t%'`, label: `t` },
          { sql: `${CUBE}.comment like '%aweful%'`, label: `t` },
          { sql: `${CUBE}.comment like '%unpleasant%'`, label: `t` },
          { sql: `${CUBE}.comment like '%useless%'`, label: `t` },
          { sql: `${CUBE}.comment like '%boring%'`, label: `t` },
        ],
        else: { label: `f` }
      }
    },
    comment: {
      sql: `comment`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    creationDate: {
      sql: `creation_date`,
      type: `time`
    },
    
    time: {
      sql: `time`,
      type: `time`
    }
  },

  refreshKey: {
    every: `4 week`
  }
});
