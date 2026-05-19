import Hero           from '@components/sections/Hero'
import MissionVision  from '@components/sections/MissionVision'
import ImpactStats    from '@components/sections/ImpactStats'
import FeaturedPrograms from '@components/sections/FeaturedPrograms'
import Testimonials   from '@components/sections/Testimonials'
import LatestEvents   from '@components/sections/LatestEvents'
import FeaturedBlogs  from '@components/sections/FeaturedBlogs'
import ContactSection from '@components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Hero />
      <MissionVision />
      <ImpactStats />
      <FeaturedPrograms />
      <Testimonials />
      <LatestEvents />
      <FeaturedBlogs />
      <ContactSection />
    </>
  )
}
