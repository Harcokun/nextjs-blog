import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { useContainer } from "../services/containerProvider";
import { useEffect, useState } from "react";

export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, home }) {
  const { authService, userService } = useContainer();
  //var username = "";
  const [username, setUsername] = useState("");

  //const username = await userService.getUsername() //I should use useEffect to initialize things

  const callUserName = async () => {
    const name = await userService.getUserName();
    setUsername(name);
  };

  useEffect(() => {
    callUserName();
  }, []);

  // userService.getUserName().then((result) => {
  //   username = result;
  //   //console.log(`Username 1: ${username}`);
  // });
  // //console.log(`Username 2: ${username}`);

  const name = authService.isLogin ? username : "Welcome to Test System";
  //console.log(`Name: ${name}`);

  return (
    <div className="max-w-xl px-4 mt-12 mx-auto mb-24">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex flex-col items-center">
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className="mt-12">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
