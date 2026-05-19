import Hero from '@components/sections/Hero'
import MissionVision from '@components/sections/MissionVision'
import ImpactStats from '@components/sections/ImpactStats'
import FeaturedPrograms from '@components/sections/FeaturedPrograms'
import Testimonials from '@components/sections/Testimonials'
import LatestEvents from '@components/sections/LatestEvents'
import CallToAction from '@components/sections/CallToAction'
import Newsletter from '@components/sections/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <MissionVision />
      <ImpactStats />
      <FeaturedPrograms />
      <Testimonials />
      <LatestEvents />
      <CallToAction />
      <Newsletter />
    </>
  )
}
