import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from "./context/user"


export const metadata = {
  title: "Ebay Clone",
  description: "E-commerce website that helps people buy and sell goods and services online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        {/* User details will be available throughout our application */}
        <UserProvider>
          {children}
        </UserProvider>

        </body>
    </html>
  );
}
