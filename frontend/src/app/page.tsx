import styles from './page.module.css';
import Container from "@mui/material/Container";
import StartPage from "@/app/start/page";
import Chatbox from "@/app/components/Chatbox";

export default function Home() {
  return (
      <div>
          <main className={styles['main']}>
              <Container style={{ backgroundColor: "white"}}>
                <StartPage/>
                  <Chatbox/>
              </Container>
          </main>
      </div>
  );
}
