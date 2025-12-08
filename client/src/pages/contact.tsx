import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Github, Linkedin, Twitter, Instagram, Dribbble, Mail, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { BackgroundScene } from "@/components/three/Scene";
import { socialLinks } from "@/lib/data";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, JSX.Element> = {
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  dribbble: <Dribbble className="w-5 h-5" />,
};

function ParticleBurst({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: "50%",
            top: "50%",
            backgroundColor: ["#FF00FF", "#00FFFF", "#39FF14"][i % 3],
            boxShadow: `0 0 10px ${["#FF00FF", "#00FFFF", "#39FF14"][i % 3]}`,
          }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: Math.cos((i / 20) * Math.PI * 2) * (100 + Math.random() * 50),
            y: Math.sin((i / 20) * Math.PI * 2) * (100 + Math.random() * 50),
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      setShowBurst(true);
      setTimeout(() => {
        setIsSubmitted(true);
        setShowBurst(false);
      }, 800);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <BackgroundScene />
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-wider mb-4"
            style={{ textShadow: "0 0 30px rgba(0, 255, 255, 0.5)" }}
            data-testid="text-contact-title"
          >
            Get In <span className="text-neon-blue">Touch</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you. Let's create something amazing together.
          </p>
          <div
            className="w-24 h-1 mx-auto rounded-full bg-neon-blue mt-6"
            style={{ boxShadow: "0 0 20px #00FFFF" }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              className="relative p-6 sm:p-8 bg-card/50 border-white/10 overflow-hidden"
              style={{ boxShadow: "0 0 40px rgba(255, 0, 255, 0.1)" }}
            >
              <ParticleBurst isActive={showBurst} />

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-green/20 flex items-center justify-center"
                      style={{ boxShadow: "0 0 40px rgba(57, 255, 20, 0.3)" }}
                    >
                      <CheckCircle className="w-10 h-10 text-neon-green" />
                    </motion.div>
                    <h3
                      className="font-display text-2xl font-bold text-white uppercase tracking-wider mb-2 glitch-text"
                      data-text="Message Sent!"
                    >
                      Message Sent!
                    </h3>
                    <p className="text-white/60">
                      Thank you for reaching out. I'll get back to you soon!
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6 font-display uppercase tracking-wider border-neon-pink text-neon-pink hover:bg-neon-pink/10"
                      onClick={() => setIsSubmitted(false)}
                      data-testid="button-send-another"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2
                      className="font-display text-2xl font-bold text-white uppercase tracking-wider mb-6"
                      style={{ textShadow: "0 0 15px rgba(255, 0, 255, 0.5)" }}
                    >
                      Send a Message
                    </h2>

                    <Form {...form}>
                      <form
                        ref={formRef}
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-display text-xs uppercase tracking-wider text-neon-blue">
                                Your Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="John Doe"
                                  className="bg-black/50 border-white/20 focus:border-neon-pink text-white placeholder:text-white/30"
                                  style={{
                                    boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.5)",
                                  }}
                                  data-testid="input-name"
                                />
                              </FormControl>
                              <FormMessage className="text-destructive" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-display text-xs uppercase tracking-wider text-neon-blue">
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="john@example.com"
                                  className="bg-black/50 border-white/20 focus:border-neon-pink text-white placeholder:text-white/30"
                                  style={{
                                    boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.5)",
                                  }}
                                  data-testid="input-email"
                                />
                              </FormControl>
                              <FormMessage className="text-destructive" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-display text-xs uppercase tracking-wider text-neon-blue">
                                Your Message
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Tell me about your project..."
                                  rows={5}
                                  className="bg-black/50 border-white/20 focus:border-neon-pink text-white placeholder:text-white/30 resize-none"
                                  style={{
                                    boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.5)",
                                  }}
                                  data-testid="input-message"
                                />
                              </FormControl>
                              <FormMessage className="text-destructive" />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          size="lg"
                          disabled={mutation.isPending}
                          className="w-full font-display uppercase tracking-wider bg-neon-pink hover:bg-neon-pink/90 text-white"
                          style={{ boxShadow: "0 0 30px rgba(255, 0, 255, 0.5)" }}
                          data-testid="button-submit"
                        >
                          {mutation.isPending ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            <>
                              Send Message
                              <Send className="ml-2 w-5 h-5" />
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h2
                className="font-display text-2xl font-bold text-white uppercase tracking-wider mb-6"
                style={{ textShadow: "0 0 15px rgba(57, 255, 20, 0.5)" }}
              >
                Contact Info
              </h2>

              <div className="space-y-4">
                <Card
                  className="p-4 bg-card/30 border-white/10 flex items-center gap-4 group hover:border-neon-pink/50 transition-all"
                >
                  <div
                    className="p-3 rounded-lg bg-neon-pink/20 border border-neon-pink/50 group-hover:bg-neon-pink/30 transition-colors"
                    style={{ boxShadow: "0 0 15px rgba(255, 0, 255, 0.2)" }}
                  >
                    <Mail className="w-5 h-5 text-neon-pink" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Email</p>
                    <p className="text-white font-medium">nikhil@example.com</p>
                  </div>
                </Card>

                <Card
                  className="p-4 bg-card/30 border-white/10 flex items-center gap-4 group hover:border-neon-blue/50 transition-all"
                >
                  <div
                    className="p-3 rounded-lg bg-neon-blue/20 border border-neon-blue/50 group-hover:bg-neon-blue/30 transition-colors"
                    style={{ boxShadow: "0 0 15px rgba(0, 255, 255, 0.2)" }}
                  >
                    <MapPin className="w-5 h-5 text-neon-blue" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Location</p>
                    <p className="text-white font-medium">San Francisco, CA</p>
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <h2
                className="font-display text-2xl font-bold text-white uppercase tracking-wider mb-6"
                style={{ textShadow: "0 0 15px rgba(0, 255, 255, 0.5)" }}
              >
                Follow Me
              </h2>

              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid={`link-social-${link.name.toLowerCase()}`}
                  >
                    <div
                      className="p-4 rounded-lg bg-card/50 border border-white/10 text-white/70 group-hover:text-neon-pink group-hover:border-neon-pink/50 transition-all"
                      style={{
                        boxShadow: "0 0 0 rgba(255, 0, 255, 0)",
                      }}
                    >
                      {iconMap[link.icon] || <Github className="w-5 h-5" />}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <Card
              className="p-6 bg-gradient-to-br from-neon-pink/10 to-neon-blue/10 border-white/10"
              style={{ boxShadow: "0 0 40px rgba(255, 0, 255, 0.1)" }}
            >
              <h3
                className="font-display text-lg font-bold text-white uppercase tracking-wider mb-2"
              >
                Let's Collaborate
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Let's build something extraordinary together!
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
