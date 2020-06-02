--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Ubuntu 12.2-4)
-- Dumped by pg_dump version 12.2 (Ubuntu 12.2-4)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: department_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.department_id_seq
    START WITH 3025
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.department_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department (
    id integer DEFAULT nextval('public.department_id_seq'::regclass) NOT NULL,
    name character varying(100)
);


ALTER TABLE public.department OWNER TO postgres;

--
-- Name: school_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.school_id_seq
    START WITH 6001
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.school_id_seq OWNER TO postgres;

--
-- Name: school; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.school (
    id integer DEFAULT nextval('public.school_id_seq'::regclass) NOT NULL,
    name character varying(100),
    state character varying(100),
    city character varying(100)
);


ALTER TABLE public.school OWNER TO postgres;

--
-- Name: school_departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.school_departments (
    school_id integer,
    department_id integer,
    id integer NOT NULL
);


ALTER TABLE public.school_departments OWNER TO postgres;

--
-- Name: school_departments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.school_departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.school_departments_id_seq OWNER TO postgres;

--
-- Name: school_departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.school_departments_id_seq OWNED BY public.school_departments.id;


--
-- Name: school_ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.school_ratings_id_seq
    START WITH 395265
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.school_ratings_id_seq OWNER TO postgres;

--
-- Name: school_ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.school_ratings (
    id integer DEFAULT nextval('public.school_ratings_id_seq'::regclass) NOT NULL,
    condition integer,
    location integer,
    career_opportunities integer,
    events integer,
    activities integer,
    comment text,
    creation_date date,
    food integer,
    internet integer,
    library integer,
    reputation integer,
    safety integer,
    satisfaction integer,
    status integer,
    "time" timestamp without time zone,
    helpful_votes integer,
    not_helpful_votes integer,
    school_id integer
);


ALTER TABLE public.school_ratings OWNER TO postgres;

--
-- Name: teacher_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teacher_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teacher_id_seq OWNER TO postgres;

--
-- Name: teacher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacher (
    id integer DEFAULT nextval('public.teacher_id_seq'::regclass) NOT NULL,
    first_name character varying(100),
    last_name character varying(100),
    department_id integer,
    school_id integer
);


ALTER TABLE public.teacher OWNER TO postgres;

--
-- Name: teacher_ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacher_ratings (
    id integer NOT NULL,
    admin_review_timestamp timestamp without time zone,
    is_attendance_mandatory boolean,
    clarity integer,
    class_name character varying(100),
    comment text,
    is_for_credit boolean,
    "timestamp" timestamp without time zone,
    difficulty integer,
    grade character varying(100),
    helpful integer,
    is_online_class boolean,
    tags text,
    is_textbook_used boolean,
    helpful_votes integer,
    not_helpful_votes integer,
    is_retake_worthy boolean,
    teacher_id integer
);


ALTER TABLE public.teacher_ratings OWNER TO postgres;

--
-- Name: teacher_ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teacher_ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teacher_ratings_id_seq OWNER TO postgres;

--
-- Name: teacher_ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teacher_ratings_id_seq OWNED BY public.teacher_ratings.id;


--
-- Name: school_departments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school_departments ALTER COLUMN id SET DEFAULT nextval('public.school_departments_id_seq'::regclass);


--
-- Name: teacher_ratings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_ratings ALTER COLUMN id SET DEFAULT nextval('public.teacher_ratings_id_seq'::regclass);


--
-- Name: school_ratings campus_rating_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school_ratings
    ADD CONSTRAINT campus_rating_pkey PRIMARY KEY (id);


--
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);


--
-- Name: school_departments school_departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school_departments
    ADD CONSTRAINT school_departments_pkey PRIMARY KEY (id);


--
-- Name: school school_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school
    ADD CONSTRAINT school_pkey PRIMARY KEY (id);


--
-- Name: teacher teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_pkey PRIMARY KEY (id);


--
-- Name: teacher_ratings teacher_ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_ratings
    ADD CONSTRAINT teacher_ratings_pkey PRIMARY KEY (id);


--
-- Name: school_ratings campus_rating_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school_ratings
    ADD CONSTRAINT campus_rating_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id);


--
-- Name: school_departments school_departments_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school_departments
    ADD CONSTRAINT school_departments_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.department(id);


--
-- Name: school_departments school_departments_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school_departments
    ADD CONSTRAINT school_departments_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id);


--
-- Name: teacher teacher_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.department(id);


--
-- Name: teacher_ratings teacher_ratings_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_ratings
    ADD CONSTRAINT teacher_ratings_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teacher(id);


--
-- Name: teacher teacher_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id);


--
-- PostgreSQL database dump complete
--

