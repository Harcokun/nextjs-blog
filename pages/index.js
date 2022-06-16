import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import Login from "./login";
import { useRouter } from "next/router";
import axios from "axios";
import { authService } from "../services/container";
//import useToken from "../components/useToken";

export default function Home({ allPostsData }) {
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [hasError, setErrorExisted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    //if (typeof window !== "undefined") {
      setToken(window.localStorage.getItem("token"));
      //token = localStorage.getItem("token");
    //}
    console.log(`Token at 1st state: ${token}`);
    //console.log(`Is token empty?: ${token == null || token == ""}`);
  }, []);

  if (!token) {
    return <Login />;
  }

  const handleLogout = () => {
    console.log(`Token used in logout: ${token}`);
    setErrorMsg(authService.logout());
    if(errorMsg) {
      setErrorExisted(true);
    }
    if (!hasError && typeof window !== "undefined") {
      console.log(`Token at logout state: ${token}`);
      location.reload();
    }
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, my name is Harcokun. Nice to meet you.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <button
        className="rounded-[60px] bg-red-400 font-medium text-[16px] border hover:opacity-60 p-2 mb-2"
        type="submit"
        onClick={handleLogout}
      >
        Log out
      </button>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
