/**
 * The page, in the order a visitor reads it.
 *
 * The release is fetched once here and handed to the two places that show it,
 * so the page never asks for the same file twice or shows two different
 * versions of it.
 */

import {Faq} from './components/sections/Faq.tsx';
import {FeatureGrid} from './components/sections/FeatureGrid.tsx';
import {Hero} from './components/sections/Hero.tsx';
import {DownloadSection} from './components/sections/DownloadSection.tsx';
import {InstallGuide} from './components/sections/InstallGuide.tsx';
import {SiteFooter} from './components/layout/SiteFooter.tsx';
import {SiteHeader} from './components/layout/SiteHeader.tsx';
import {useRelease} from './hooks/useRelease.ts';

export default function App() {
  const release = useRelease();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero state={release} />
        <FeatureGrid />
        <DownloadSection state={release} />
        <InstallGuide />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  );
}
