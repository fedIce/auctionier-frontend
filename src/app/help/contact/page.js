'use client';
import { useState } from 'react';
import { CheckCircleIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Card, CardContent } from '../../../components/card';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Textarea } from '../../../components/TextArea';
import { Label } from '../../../components/Label';
import { useAlert } from '../../../contexts/Alert';

export default function Contact() {
  const alert = useAlert();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    buildingType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with localStorage
    setTimeout(() => {
      // Store contact request in localStorage
      const contactRequests = JSON.parse(localStorage.getItem('mvContactRequests') || '[]');
      const newRequest = {
        id: Date.now(),
        ...formState,
        date: new Date().toISOString(),
        status: 'new'
      };
      contactRequests.push(newRequest);
      localStorage.setItem('mvContactRequests', JSON.stringify(contactRequests));
      
      // Reset form state
      setFormState({
        name: '',
        email: '',
        phone: '',
        buildingType: '',
        message: '',
      });
      
      setIsSubmitting(false);
      alert.setalert('success', 'Contact request submitted! We will get back to you as soon as possible.');
    }, 1000);
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'PhoneIcon',
      details: '(555) 123-4567',
      subtext: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      details: 'info@garvelbids.com',
      subtext: 'We respond within 24 hours'
    },
    {
      icon: MapPinIcon,
      title: 'Office',
      details: '123 Property Lane',
      subtext: 'Building Plaza, CA 90001'
    },
    {
      icon: ClockIcon,
      title: 'Hours',
      details: 'Monday - Friday',
      subtext: '8:00 AM - 6:00 PM'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-beige py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-licorice mb-4">Contact Us</h1>
            <p className="text-lg text-licorice-700">
              Get in touch with our team to discuss your auction needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-baby_powder">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <Card key={index} className="border-beige">
                <CardContent className="p-6 text-center">
                  <div className="bg-mindaro/15 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-mindaro-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-licorice mb-2">{item.title}</h3>
                  <p className="text-licorice-700 font-medium">{item.details}</p>
                  <p className="text-licorice-500 text-sm">{item.subtext}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 bg-baby_powder">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-licorice mb-4">Get In Touch</h2>
              <p className="text-licorice-700 mb-8">
                Fill out the form below to schedule a consultation, request a quote, or inquire about our services.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-mindaro mr-3 shrink-0 mt-0.5" />
                  <p className="text-licorice-700">Find out more about auctions in your city.</p>
                </div>
                {/* <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-mindaro mr-3 shrink-0 mt-0.5" />
                  <p className="text-licorice-700">Customized maintenance plans for your building complex</p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-mindaro mr-3 shrink-0 mt-0.5" />
                  <p className="text-licorice-700">Transparent pricing with no hidden fees</p>
                </div> */}
              </div>
              
              {/* Image placeholder */}
              <div className="bg-secondary-100 rounded-lg h-64 flex items-center justify-center">
                <span className="text-secondary-500 text-lg">Contact support team image</span>
              </div>
            </div>
            
            <div>
              <Card className="border-mindaro">
                <CardContent className="p-6 pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-licorice">Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Your full name" 
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="border-beige focus:border-mindaro"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="text-licorice">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            placeholder="your@email.com" 
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="border-beige focus:border-mindaro"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-licorice">PhoneIcon</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            placeholder="(555) 123-4567" 
                            value={formState.phone}
                            onChange={handleChange}
                            className="border-beige focus:border-mindaro"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="buildingType" className="text-licorice">Building Complex Type</Label>
                        <Input
                          id="buildingType" 
                          name="buildingType" 
                          placeholder="Apartment complex, office building, etc." 
                          value={formState.buildingType}
                          onChange={handleChange}
                          className="border-beige focus:border-mindaro"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message" className="text-licorice">Message</Label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          placeholder="Ask your questions or concerns..." 
                          rows={4}
                          value={formState.message}
                          onChange={handleChange}
                          required
                          className="resize-none border-beige focus:border-mindaro"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-foreground hover:bg-foreground-400 py-2.5 cursor-pointer text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-beige-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-licorice mb-2">Find Us</h2>
            <p className="text-licorice-700">
              Visit our office to meet our team and discuss your needs in person.
            </p>
          </div>
          
          {/* Map placeholder */}
          <div className="bg-baby_powder border border-beige rounded-lg h-96 flex items-center justify-center">
            <span className="text-beige-500 text-lg">Map showing 123 Property Lane, Building Plaza, CA 90001</span>
          </div>
        </div>
      </section>
    </>
  );
}