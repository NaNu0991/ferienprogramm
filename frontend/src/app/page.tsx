import styles from './page.module.css';
import Container from "@mui/material/Container";
import StartPage from "@/app/start/page";
import ChatboxWrapper from "@/app/components/Chatbox/ChatboxWrapper";

export default function Home() {
  return (
      <div>
          <main className={styles['main']}>
              <Container style={{ backgroundColor: "white"}}>
                <StartPage/>
                  <ChatboxWrapper />
              </Container>
          </main>
      </div>
  );
}
