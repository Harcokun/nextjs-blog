import "../styles/global.css";
import { ContainerProvider } from "../services/containerProvider";

export default function App({ Component, pageProps }) {
  if (typeof window !== "undefined") {
    return (
      <ContainerProvider>
        <Component {...pageProps} />
      </ContainerProvider>
    );
  }
  return null;
}
