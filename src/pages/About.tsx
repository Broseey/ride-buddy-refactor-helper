
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Users, Target, Eye, Award, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";

const About = () => {
  const [showCEOLetter, setShowCEOLetter] = useState(false);
  const [showDirectorLetter, setShowDirectorLetter] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Uniride
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connecting Nigerian students with safe, affordable, and reliable transportation 
            solutions between universities and cities.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <div className="flex items-start gap-4 mb-6">
                <Target className="h-8 w-8 text-black mt-1" />
                <p className="text-lg text-gray-600">
                  To revolutionize student transportation in Nigeria by providing a safe, 
                  affordable, and efficient ride-sharing platform that connects universities 
                  with major cities, making travel accessible for every student.
                </p>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <div className="flex items-start gap-4">
                <Eye className="h-8 w-8 text-black mt-1" />
                <p className="text-lg text-gray-600">
                  To become the leading student transportation network across Africa, 
                  fostering academic mobility and creating opportunities for students 
                  to pursue their dreams without transportation barriers.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
              <Users className="h-24 w-24 text-gray-400" />
              <span className="ml-4 text-gray-500 text-lg">Mission Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership</h2>
            <p className="text-xl text-gray-600">Meet the team driving Uniride's mission</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* CEO Card */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <CardTitle className="text-xl">Adebayo Ogunlana</CardTitle>
                <p className="text-gray-600">Chief Executive Officer</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  With over 10 years of experience in transportation and logistics, 
                  Adebayo leads Uniride's vision to transform student mobility across Nigeria.
                </p>
                <Button 
                  onClick={() => setShowCEOLetter(true)}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Read CEO Letter
                </Button>
              </CardContent>
            </Card>

            {/* Director Card */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <CardTitle className="text-xl">Dr. Funmi Adebayo</CardTitle>
                <p className="text-gray-600">Director of Operations</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Former Vice-Chancellor at Lagos State University, Dr. Adebayo brings 
                  deep understanding of student needs and academic mobility challenges.
                </p>
                <Button 
                  onClick={() => setShowDirectorLetter(true)}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Read Director Letter
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every driver is thoroughly vetted and all vehicles are inspected 
                  to ensure the highest safety standards for our students.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Student-Centric</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our platform is designed with students in mind, offering 
                  affordable pricing and flexible scheduling options.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We're committed to providing dependable transportation 
                  services that students can count on for their academic journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CEO Letter Modal */}
      <Dialog open={showCEOLetter} onOpenChange={setShowCEOLetter}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Letter from the CEO</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Adebayo Ogunlana</h3>
                <p className="text-gray-600">Chief Executive Officer</p>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <Quote className="h-8 w-8 text-gray-400 mb-4" />
              <p className="text-lg leading-relaxed mb-4">
                Dear Students and Partners,
              </p>
              <p className="mb-4">
                When I founded Uniride in 2023, I had a simple yet powerful vision: to ensure that no 
                Nigerian student's educational journey would be hindered by transportation challenges. 
                Having experienced firsthand the difficulties of traveling between universities and home 
                during my own academic years, I understood the critical need for a reliable, safe, and 
                affordable transportation solution.
              </p>
              <p className="mb-4">
                Today, Uniride has grown beyond my initial dreams. We've successfully connected thousands 
                of students with verified transportation providers, ensuring safe journeys across Nigeria. 
                Our platform has not only solved transportation challenges but has also created economic 
                opportunities for drivers and transportation companies in our network.
              </p>
              <p className="mb-4">
                What sets us apart is our unwavering commitment to student safety and affordability. 
                Every driver in our network undergoes thorough background checks, and every vehicle is 
                regularly inspected. We've built a community where students can travel with confidence, 
                knowing they're in safe hands.
              </p>
              <p className="mb-4">
                As we look to the future, our mission remains clear: to expand our reach to every university 
                in Nigeria and eventually across Africa. We're not just building a transportation platform; 
                we're building bridges that connect students to their dreams and aspirations.
              </p>
              <p className="mb-4">
                Thank you for trusting Uniride with your transportation needs. Together, we're making 
                education more accessible for every Nigerian student.
              </p>
              <p className="font-semibold">
                Safe travels,<br />
                Adebayo Ogunlana<br />
                CEO, Uniride
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Director Letter Modal */}
      <Dialog open={showDirectorLetter} onOpenChange={setShowDirectorLetter}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Letter from the Director</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Dr. Funmi Adebayo</h3>
                <p className="text-gray-600">Director of Operations</p>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <Quote className="h-8 w-8 text-gray-400 mb-4" />
              <p className="text-lg leading-relaxed mb-4">
                Dear Students, Parents, and Educational Community,
              </p>
              <p className="mb-4">
                As someone who has dedicated over 20 years to Nigerian higher education, I've witnessed 
                countless talented students struggle with transportation challenges that threatened to 
                derail their academic dreams. It's this experience that drew me to Uniride's mission 
                and convinced me to join this revolutionary platform.
              </p>
              <p className="mb-4">
                During my tenure as Vice-Chancellor at Lagos State University, I saw brilliant students 
                from rural areas arrive late to crucial exams, miss important lectures, or even consider 
                dropping out because of unreliable transportation. These experiences broke my heart and 
                fueled my passion for finding sustainable solutions.
              </p>
              <p className="mb-4">
                Uniride represents more than just a transportation service; it's an enabler of dreams. 
                Our platform ensures that a student from Sokoto can pursue engineering at the University 
                of Lagos without worrying about how to get home for holidays. It guarantees that a young 
                woman from Bayelsa can attend medical school in Ibadan with the confidence that safe, 
                reliable transportation is always available.
              </p>
              <p className="mb-4">
                What I'm most proud of is how we've maintained the highest safety standards while keeping 
                our services affordable. Every safety protocol we've implemented comes from understanding 
                that we're not just transporting passengers – we're carrying the hopes and dreams of 
                families who have invested everything in their children's education.
              </p>
              <p className="mb-4">
                To our student users: your academic success is our priority. To parents: your children's 
                safety is our responsibility. To university administrators: we're your partners in 
                ensuring no student's potential is limited by geography.
              </p>
              <p className="font-semibold">
                With warm regards,<br />
                Dr. Funmi Adebayo<br />
                Director of Operations, Uniride
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500">© 2025 Uniride. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
