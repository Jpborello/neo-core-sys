import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaInstagram, FaLinkedin, FaEnvelope, FaDribbble } from 'react-icons/fa';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function WebFramerPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-200 selection:text-black overflow-x-hidden">

            {/* NAVIGATION */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="text-xl font-medium tracking-tight">Neo<span className="text-gray-400">Core</span></div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
                        <a href="#about" className="hover:text-black transition-colors">About</a>
                        <a href="#experience" className="hover:text-black transition-colors">Experience</a>
                        <a href="#projects" className="hover:text-black transition-colors">Projects</a>
                        <a href="#contact" className="px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">Let's Talk</a>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="pt-40 pb-20 px-6 min-h-[90vh] flex flex-col justify-center">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-3">
                            <div className="w-12 h-[1px] bg-gray-300"></div>
                            <span className="text-gray-500 uppercase tracking-widest text-xs font-semibold">Portfolio Template</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-light tracking-tighter leading-[1.1] mb-8">
                            Digital <br />
                            <span className="font-semibold">Designer</span> & <br />
                            <span className="text-gray-400">Developer.</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-xl text-gray-500 max-w-md leading-relaxed mb-10 font-light">
                            Crafting digital experiences with a focus on motion, interaction, and clean aesthetics.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            <a href="#projects" className="px-8 py-4 bg-black text-white rounded-full font-medium hover:scale-105 transition-transform flex items-center gap-2">
                                View Work <FaArrowRight size={14} />
                            </a>
                            <a href="#contact" className="px-8 py-4 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors">
                                Contact Me
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative h-[600px] w-full bg-gray-100 rounded-[2rem] overflow-hidden"
                    >
                        {/* Abstract Placeholder Art */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl opacity-60"></div>
                            <img
                                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
                                alt="Abstract Minimalist Workspace"
                                className="w-full h-full object-cover opacity-80 mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ABOUT ME */}
            <section id="about" className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="h-[500px] bg-gray-200 rounded-2xl overflow-hidden relative"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
                            alt="Profile"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl font-light mb-8 tracking-tight">
                            About <span className="font-semibold">Me</span>
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
                            I am a multidisciplinary creative based in Buenos Aires, specializing in UI/UX design and frontend development. I believe that good design is invisible—it just works.
                        </motion.p>
                        <motion.p variants={fadeInUp} className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
                            With over 5 years of experience, I help brands and startups build meaningful digital products that stand out in a crowded market. My approach is rooted in simplicity, functionality, and emotional connection.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-3xl font-bold mb-1">5+</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">Years Experience</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold mb-1">50+</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">Projects Completed</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience" className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-light tracking-tight mb-4">Work <span className="font-semibold">Experience</span></h2>
                        <p className="text-gray-500">My professional journey so far.</p>
                    </motion.div>

                    <div className="space-y-12">
                        {[
                            { role: "Senior Product Designer", company: "TechFlow Inc.", period: "2023 - Present", desc: "Leading the design system team and overseeing product UX." },
                            { role: "Frontend Developer", company: "Creative Agency", period: "2021 - 2023", desc: "Developed award-winning websites using React and WebGL." },
                            { role: "UI Designer", company: "Freelance", period: "2019 - 2021", desc: "Worked with global clients to deliver high-end interfaces." }
                        ].map((job, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-12 hover:border-gray-300 transition-colors"
                            >
                                <div className="mb-4 md:mb-0">
                                    <h3 className="text-2xl font-medium mb-1 group-hover:translate-x-2 transition-transform duration-300">{job.role}</h3>
                                    <p className="text-gray-500">{job.company}</p>
                                </div>
                                <div className="text-right md:text-right">
                                    <p className="text-sm font-semibold mb-1">{job.period}</p>
                                    <p className="text-gray-400 text-sm max-w-xs ml-auto">{job.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SKILLS */}
            <section className="py-24 px-6 bg-black text-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl font-light tracking-tight mb-4">My <span className="font-semibold">Skills</span></h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {["Framer", "React", "Next.js", "TailwindCSS", "TypeScript", "Node.js", "UI Design", "Motion"].map((skill, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors"
                            >
                                <h3 className="text-xl font-light">{skill}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-end mb-16"
                    >
                        <div>
                            <h2 className="text-4xl font-light tracking-tight mb-4">Selected <span className="font-semibold">Works</span></h2>
                            <p className="text-gray-500">A showcase of my best projects.</p>
                        </div>
                        <a href="#" className="hidden md:flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all">View All <FaArrowRight /></a>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: "E-Commerce Redesign", category: "UI/UX Design", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" },
                            { title: "Finance App", category: "Mobile Development", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" },
                            { title: "Architecture Portfolio", category: "Web Design", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop" },
                            { title: "SaaS Dashboard", category: "Product Design", img: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1887&auto=format&fit=crop" }
                        ].map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden mb-6 relative">
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                                    <img
                                        src={project.img}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-2xl font-medium mb-1">{project.title}</h3>
                                <p className="text-gray-500 text-sm uppercase tracking-wider">{project.category}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="py-24 px-6 bg-gray-50">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-8">Let's work <br /><span className="font-semibold">together.</span></h2>
                        <p className="text-xl text-gray-500 mb-12 font-light">
                            Have a project in mind? I'd love to hear about it.
                        </p>

                        <form className="max-w-md mx-auto space-y-4 text-left">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Name</label>
                                <input type="text" className="w-full bg-white border-b border-gray-200 p-4 focus:outline-none focus:border-black transition-colors" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Email</label>
                                <input type="email" className="w-full bg-white border-b border-gray-200 p-4 focus:outline-none focus:border-black transition-colors" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Message</label>
                                <textarea rows="4" className="w-full bg-white border-b border-gray-200 p-4 focus:outline-none focus:border-black transition-colors" placeholder="Tell me about your project..."></textarea>
                            </div>
                            <button className="w-full py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors mt-8">
                                Send Message
                            </button>
                        </form>

                        <div className="mt-16 flex justify-center gap-8">
                            <a href="#" className="text-gray-400 hover:text-black transition-colors"><FaInstagram size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-black transition-colors"><FaLinkedin size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-black transition-colors"><FaDribbble size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-black transition-colors"><FaEnvelope size={24} /></a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 px-6 border-t border-gray-200 text-center">
                <p className="text-gray-400 text-sm">© 2024 Neo-Core-Sys. All rights reserved.</p>
            </footer>

        </div>
    );
}
