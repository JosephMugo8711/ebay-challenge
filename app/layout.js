import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const metadata = {
  title: "Ebay Clone",
  description: "E-commerce website that helps people buy and sell goods and services online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        {children}
        </body>
    </html>
  );
}
