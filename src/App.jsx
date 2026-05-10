import { useState } from 'react';
import { useLenis }        from './utils/useLenis';
import { Cursor }          from './components/Cursor';
import { ScrollProgress }  from './components/ScrollProgress';
import { LoadOverlay }     from './sections/LoadOverlay';
import { Hero }            from './sections/Hero';
import { MarqueeBanner }   from './sections/Marquee';
import { DayStory }        from './sections/DayStory';
import { TheWeek }         from './sections/TheWeek';
import { TheOffer }        from './sections/TheOffer';
import { Footer }          from './sections/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <Cursor />
      <ScrollProgress color="#f59e0b" height={2} />
      <LoadOverlay onComplete={() => setLoaded(true)} />

      <main style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}>
        <Hero />
        <MarqueeBanner />
        <DayStory />
        <TheWeek />
        <TheOffer />
        <Footer />
      </main>
    </>
  );
}
