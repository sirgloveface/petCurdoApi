--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

-- Started on 2017-08-03 10:44:02

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12387)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2129 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 185 (class 1259 OID 16394)
-- Name: log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE log (
    id_log integer NOT NULL,
    identifier character varying(50),
    fecha date,
    json json
);


ALTER TABLE log OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 16397)
-- Name: Logs_id_log_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Logs_id_log_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Logs_id_log_seq" OWNER TO postgres;

--
-- TOC entry 2130 (class 0 OID 0)
-- Dependencies: 186
-- Name: Logs_id_log_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Logs_id_log_seq" OWNED BY log.id_log;


--
-- TOC entry 2001 (class 2604 OID 16399)
-- Name: log id_log; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY log ALTER COLUMN id_log SET DEFAULT nextval('"Logs_id_log_seq"'::regclass);


--
-- TOC entry 2131 (class 0 OID 0)
-- Dependencies: 186
-- Name: Logs_id_log_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Logs_id_log_seq"', 1, false);


--
-- TOC entry 2121 (class 0 OID 16394)
-- Dependencies: 185
-- Data for Name: log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY log (id_log, identifier, fecha) FROM stdin;
\.


--
-- TOC entry 2003 (class 2606 OID 16404)
-- Name: log Log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY log
    ADD CONSTRAINT "Log_pkey" PRIMARY KEY (id_log);


-- Completed on 2017-08-03 10:44:03

--
-- PostgreSQL database dump complete
--

