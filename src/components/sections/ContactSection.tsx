import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const streamIndicatorRef = useRef<HTMLDivElement>(null);
  
  const [activeInputIndex, setActiveInputIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Form State
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '' as string | undefined,
    project_type: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Stagger entrance animation
      gsap.from('.contact-reveal', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, { scope: containerRef });

  // Handle focus animation for the data-stream indicator
  useGSAP(() => {
    if (activeInputIndex !== null && streamIndicatorRef.current && formRef.current) {
      const formInputGroups = formRef.current.querySelectorAll('.input-group');
      const targetGroup = formInputGroups[activeInputIndex] as HTMLElement;
      
      if (targetGroup) {
        // Find relative Y position
        const groupTop = targetGroup.offsetTop;
        const groupHeight = targetGroup.offsetHeight;
        
        gsap.to(streamIndicatorRef.current, {
          y: groupTop + (groupHeight / 2) - 20, // Center relative to input
          height: 40,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    } else if (streamIndicatorRef.current) {
      gsap.to(streamIndicatorRef.current, {
        opacity: 0,
        height: 0,
        duration: 0.3,
      });
    }
  }, [activeInputIndex]);

  const handleFocus = (index: number) => setActiveInputIndex(index);
  const handleBlur = () => setActiveInputIndex(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on modify
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const sanitizeInput = (text: string) => {
    // Basic anti-injection: remove dangerous html brackets
    return text.replace(/[<>]/g, '');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name: No numbers, allow letters and spaces
    if (!formData.user_name.trim()) {
      newErrors.user_name = 'El nombre es obligatorio.';
    } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(formData.user_name)) {
      newErrors.user_name = 'Solo se permiten letras y espacios.';
    }

    // Email
    if (!formData.user_email.trim()) {
      newErrors.user_email = 'El correo es obligatorio.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.user_email)) {
      newErrors.user_email = 'Ingresa un correo electrónico válido.';
    }

    // Phone: Optional, but if provided, must be valid via libphonenumber-js
    if (formData.user_phone && !isPossiblePhoneNumber(formData.user_phone)) {
      newErrors.user_phone = 'El teléfono ingresado no es un formato válido.';
    }

    // Message limit max 200 words
    const words = formData.message.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length === 0) {
      newErrors.message = 'El mensaje no puede estar vacío.';
    } else if (words.length > 200) {
      newErrors.message = `Límite excedido (${words.length}/200 palabras).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current || !validateForm()) return;

    // Apply sanitization to text areas before sending via DOM (just modifying the state doesn't instantly mutate DOM)
    // We update the hidden fields safely.
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({
          user_name: '', user_email: '', user_phone: '', project_type: '', message: ''
        });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error de GattaiTech Mailer:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordsCount = formData.message.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative overflow-hidden bg-surface-dim py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          
          {/* Left Side: Editorial Text */}
          <div className="contact-reveal flex flex-col justify-center">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-on-surface sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              Construyamos la Próxima Generación.
            </h2>
            <p className="mt-6 max-w-lg font-sans text-lg text-on-surface-muted">
              Pasa de la ambición a la ejecución arquitectónica. Déjanos tus datos
              y te contactaremos para trazar el plano de tu próximo proyecto.
            </p>
            
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-4 text-on-surface">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-lowest">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-mono text-sm">hello@gattaitech.com</span>
              </div>
              <div className="flex items-center gap-4 text-on-surface">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-lowest">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="font-mono text-sm">Lima, Perú</span>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="contact-reveal relative">
            <div 
              ref={streamIndicatorRef}
              className="absolute -left-6 top-0 hidden w-[2px] rounded-full bg-secondary opacity-0 shadow-[0_0_10px_#E9C349] lg:block"
              style={{ height: '0px' }}
            />

            <form ref={formRef} className="flex flex-col gap-6" onSubmit={sendEmail} noValidate>
              
              {/* HIDDEN SANITIZED FIELDS PARA EMAILJS */}
              <input type="hidden" name="user_name" value={sanitizeInput(formData.user_name)} />
              <input type="hidden" name="user_email" value={sanitizeInput(formData.user_email)} />
              <input type="hidden" name="user_phone" value={formData.user_phone || ''} />
              <input type="hidden" name="project_type" value={sanitizeInput(formData.project_type)} />
              <input type="hidden" name="message" value={sanitizeInput(formData.message)} />

              {/* Nombre Completo */}
              <div className="input-group group flex flex-col">
                <div className="flex items-center justify-between">
                  <label htmlFor="user_name" className="mb-2 font-mono text-xs font-semibold text-on-surface-muted transition-colors duration-300 group-focus-within:text-on-surface">
                    Nombre Completo <span className="text-secondary">*</span>
                  </label>
                  {errors.user_name && <span className="text-[10px] text-red-400">{errors.user_name}</span>}
                </div>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus(0)}
                  onBlur={handleBlur}
                  className={`w-full border-0 border-b-2 bg-surface-lowest px-4 py-3 font-sans text-on-surface outline-none transition-colors duration-300 hover:bg-surface-high focus:bg-surface-high ${errors.user_name ? 'border-red-400' : 'border-outline-variant focus:border-primary focus:shadow-[0_4px_12px_rgba(63,229,108,0.1)]'}`}
                />
              </div>

              {/* Correo */}
              <div className="input-group group flex flex-col">
                <div className="flex items-center justify-between">
                  <label htmlFor="user_email" className="mb-2 font-mono text-xs font-semibold text-on-surface-muted transition-colors duration-300 group-focus-within:text-on-surface">
                    Correo Electrónico <span className="text-secondary">*</span>
                  </label>
                  {errors.user_email && <span className="text-[10px] text-red-400">{errors.user_email}</span>}
                </div>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus(1)}
                  onBlur={handleBlur}
                  className={`w-full border-0 border-b-2 bg-surface-lowest px-4 py-3 font-sans text-on-surface outline-none transition-colors duration-300 hover:bg-surface-high focus:bg-surface-high ${errors.user_email ? 'border-red-400' : 'border-outline-variant focus:border-primary focus:shadow-[0_4px_12px_rgba(63,229,108,0.1)]'}`}
                />
              </div>

              {/* Teléfono Dividido */}
              <div className="input-group group flex flex-col">
                <div className="flex items-center justify-between">
                   <label className="mb-2 font-mono text-xs font-semibold text-on-surface-muted transition-colors duration-300 group-focus-within:text-on-surface">
                    Teléfono de Contacto
                  </label>
                  {errors.user_phone && <span className="text-[10px] text-red-400">{errors.user_phone}</span>}
                </div>
               
                <div className={`flex w-full overflow-hidden border-b-2 bg-surface-lowest px-4 py-3 transition-colors duration-300 hover:bg-surface-high focus-within:bg-surface-high focus-within:border-primary focus-within:shadow-[0_4px_12px_rgba(63,229,108,0.1)] ${errors.user_phone ? 'border-red-400' : 'border-outline-variant'}`}>
                  <PhoneInput
                    defaultCountry="PE"
                    international
                    value={formData.user_phone}
                    onChange={(value) => {
                      setFormData(prev => ({ ...prev, user_phone: value }));
                      if (errors.user_phone) setErrors(prev => ({ ...prev, user_phone: '' }));
                    }}
                    onFocus={() => handleFocus(2)}
                    onBlur={handleBlur}
                    placeholder="Número telefónico"
                    className="w-full text-on-surface outline-none"
                    numberInputProps={{
                      className: 'flex-1 bg-transparent border-none outline-none font-sans text-on-surface placeholder-on-surface-muted'
                    }}
                  />
                </div>
              </div>

              {/* Proyecto */}
              <div className="input-group group flex flex-col">
                <label htmlFor="project_type" className="mb-2 font-mono text-xs font-semibold text-on-surface-muted transition-colors duration-300 group-focus-within:text-on-surface">
                  Tipo de Proyecto
                </label>
                <input
                  type="text"
                  id="project_type"
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus(3)}
                  onBlur={handleBlur}
                  className="w-full border-0 border-b-2 border-outline-variant bg-surface-lowest px-4 py-3 font-sans text-on-surface outline-none transition-colors duration-300 hover:bg-surface-high focus:border-primary focus:bg-surface-high focus:shadow-[0_4px_12px_rgba(63,229,108,0.1)]"
                />
              </div>

              {/* Mensaje Textarea */}
              <div className="input-group group flex flex-col">
                 <div className="flex items-center justify-between">
                  <label htmlFor="message" className="mb-2 font-mono text-xs font-semibold text-on-surface-muted transition-colors duration-300 group-focus-within:text-on-surface">
                    Mensaje / Detalles Adicionales <span className="text-secondary">*</span>
                  </label>
                   <span className={`text-[10px] font-mono ${wordsCount > 200 ? 'text-red-400 font-bold' : 'text-on-surface-muted'}`}>
                      {wordsCount} / 200
                   </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus(4)}
                  onBlur={handleBlur}
                  rows={4}
                  className={`w-full resize-none border-0 border-b-2 bg-surface-lowest px-4 py-3 font-sans text-on-surface outline-none transition-colors duration-300 hover:bg-surface-high focus:bg-surface-high ${errors.message ? 'border-red-400' : 'border-outline-variant focus:border-primary focus:shadow-[0_4px_12px_rgba(63,229,108,0.1)]'}`}
                ></textarea>
                {errors.message && <span className="mt-1 text-[10px] text-red-400">{errors.message}</span>}
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <Button 
                  variant="energy" 
                  className="w-full py-4 text-sm font-bold tracking-wide"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Verificando y Enviando...' : 
                   submitStatus === 'success' ? '✔ Mensaje Seguro Enviado' : 
                   submitStatus === 'error' ? '✖ Error de Red (Reintentar)' : 
                   'Enviar Mensaje'}
                </Button>
                {submitStatus === 'success' && (
                  <p className="mt-3 block text-center font-mono text-xs text-primary animate-pulse">
                     Transmisión completada. Te contactaremos en breve.
                  </p>
                )}
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
