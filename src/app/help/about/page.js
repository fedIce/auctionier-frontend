import { CheckBadgeIcon, ClockIcon, CheckCircleIcon, HandThumbUpIcon, UserIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button } from '../../../components/Button';
import Link from 'next/link';

export default function About() {
  const valueProps = [
    {
      icon: CheckBadgeIcon,
      title: 'Quality Service',
      description: 'We deliver exceptional property management services with attention to detail and quality workmanship.'
    },
    {
      icon: ClockIcon,
      title: 'Reliability',
      description: 'Consistent, dependable service you can count on, with timely responses to all maintenance requests.'
    },
    {
      icon: CheckCircleIcon,
      title: 'Transparency',
      description: 'Clear communication and honest pricing with no hidden fees or unexpected charges.'
    },
    {
      icon: HandThumbUpIcon,
      title: 'Customer Satisfaction',
      description: 'Your satisfaction is our priority, with tailored solutions to meet your property\'s specific needs.'
    },
  ];

  const teamMembers = [
    {
      name: 'Michael Vasiliev',
      position: 'Founder & CEO',
      bio: 'With over 15 years of experience in property management, Michael leads our team with a vision for excellence in building maintenance.',
    },
    {
      name: 'Victoria Morrison',
      position: 'Operations Director',
      bio: 'Victoria ensures our day-to-day operations run smoothly and that all client properties receive the attention and care they deserve.',
    },
    {
      name: 'Robert Chen',
      position: 'Maintenance Supervisor',
      bio: 'Robert coordinates our maintenance crews and ensures all repairs and maintenance work is completed to the highest standards.',
    },
    {
      name: 'Sarah Williams',
      position: 'Client Relations Manager',
      bio: 'Sarah builds strong relationships with our clients, understanding their needs and ensuring exceptional service delivery.',
    },
  ];

  return (
    <div className="w-full px-2 lg:px-0 py-8 space-y-16">
      {/* Hero Section */}
      <section className=" py-12 md:py-16 lg:px-0">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-licorice mb-4">About Garvel Bids</h1>
            <p className="text-lg text-licorice-700">
              Dedicated to providing exceptional bidding services since 2008.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 ">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-licorice mb-6">Our Story</h2>
              <div className="space-y-4 text-licorice-700">
                <p>
                  Founded in 2008 by Michael Vasiliev and Victoria Morrison, Garvel Bids began with a simple mission: to provide thew best possible bidding experience, with empasis on safety, speed and ease.
                </p>
                <p>
                  What started as a small operation serving just a few buildings in the local area has grown into a trusted name in property management, now servicing dozens of building complexes throughout the region.
                </p>
                <p>
                  Our growth stems from our unwavering commitment to quality service, attention to detail, and personalized approach to each property we manage. We understand that every building complex has unique needs, and we tailor our services accordingly.
                </p>
              </div>
              
              <div className="mt-8 flex gap-4">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-giants_orange" />
                  <span className="font-semibold">45+ Skilled Team Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowPathIcon className="h-5 w-5 text-giants_orange" />
                  <span className="font-semibold">15+ Years of Experience</span>
                </div>
              </div>
            </div>
            
            {/* Image placeholder */}
            <div className="bg-foreground-100 rounded-lg h-96 flex items-center justify-center">
              <span className="text-foreground-500 text-lg">Company founders image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-foreground-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-licorice mb-4">Our Values</h2>
            <p className="text-licorice-700">
              The principles that guide our approach to bidding and client service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((value, index) => (
              <div key={index} className=" rounded-lg p-6 shadow-sm border border-foreground-200">
                <div className="bg-bright/15 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-bright-600" />
                </div>
                <h3 className="text-xl font-semibold text-licorice mb-2">{value.title}</h3>
                <p className="text-licorice-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 ">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-licorice mb-4">Our Leadership Team</h2>
            <p className="text-licorice-700">
              Meet the experienced professionals who lead M&V Property Management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 text-center lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className=" rounded-lg overflow-hidden shadow-sm border border-foreground-200">
                <div className="bg-bright/10 h-48 flex items-center justify-center">
                  <span className="text-bright-400 text-lg">{member.name}&apos;s photo</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-licorice">{member.name}</h3>
                  <p className="text-giants_orange font-medium mb-3">{member.position}</p>
                  <p className="text-licorice-700">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-licorice mb-4">
              Ready to experience our professional property management?
            </h2>
            <p className="text-licorice-700 mb-6">
              Contact our team today to discuss how we can help maintain and improve your building complex.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-giants_orange hover:bg-giants_orange-400 text-white"
                asChild
              >
                <Link href="/help/contact">Contact Us</Link>
              </Button>
  
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}