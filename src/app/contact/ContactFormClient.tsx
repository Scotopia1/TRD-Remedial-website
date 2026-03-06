'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatedCopy } from '@/components/animations/AnimatedCopy';
import { useStore } from '@/stores/useStore';
import type { Service } from '@/types/api';

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const contactSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  serviceInterest: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://trd-remedial-website-admin.vercel.app';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ContactFormClientProps {
  services: Service[];
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactFormClient({ services }: ContactFormClientProps) {
  const setCursorVariant = useStore((state) => state.setCursorVariant);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      serviceInterest: '',
      projectType: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch(`${API_URL}/api/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          body?.error || `Submission failed (${res.status})`
        );
      }

      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    }
  };

  const handleRetry = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  // Cursor helpers
  const cursorEnter = () => setCursorVariant('hover');
  const cursorLeave = () => setCursorVariant('default');

  // ---- Success state ----
  if (status === 'success') {
    return (
      <section className="contact-form-section">
        <div className="contact-form-container">
          <div className="form-success">
            <AnimatedCopy tag="h2" className="form-success-heading" animateOnScroll={false} trigger={true}>
              Thank You
            </AnimatedCopy>
            <AnimatedCopy tag="p" delay={0.15} className="form-success-text" animateOnScroll={false} trigger={true}>
              Your message has been received. We&apos;ll be in touch within 24 hours.
            </AnimatedCopy>
            <button
              type="button"
              className="form-submit form-submit-secondary"
              onClick={() => setStatus('idle')}
              onMouseEnter={cursorEnter}
              onMouseLeave={cursorLeave}
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ---- Form state (idle / submitting / error) ----
  return (
    <section className="contact-form-section">
      <div className="contact-form-container">
        <AnimatedCopy tag="h2" className="contact-form-heading">
          Send Us a Message
        </AnimatedCopy>
        <AnimatedCopy tag="p" delay={0.1} className="contact-form-subheading">
          Tell us about your project and we&apos;ll get back to you promptly.
        </AnimatedCopy>

        <form
          className="contact-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Row 1: Name + Email */}
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="cf-name" className="form-label">
                Full Name *
              </label>
              <input
                id="cf-name"
                type="text"
                className={`form-input${errors.name ? ' form-input-error' : ''}`}
                placeholder="John Smith"
                autoComplete="name"
                {...register('name')}
                onMouseEnter={cursorEnter}
                onMouseLeave={cursorLeave}
              />
              {errors.name && (
                <span className="form-error">{errors.name.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="cf-email" className="form-label">
                Email *
              </label>
              <input
                id="cf-email"
                type="email"
                className={`form-input${errors.email ? ' form-input-error' : ''}`}
                placeholder="john@example.com"
                autoComplete="email"
                {...register('email')}
                onMouseEnter={cursorEnter}
                onMouseLeave={cursorLeave}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
          </div>

          {/* Row 2: Phone + Company */}
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="cf-phone" className="form-label">
                Phone
              </label>
              <input
                id="cf-phone"
                type="tel"
                className="form-input"
                placeholder="0400 000 000"
                autoComplete="tel"
                {...register('phone')}
                onMouseEnter={cursorEnter}
                onMouseLeave={cursorLeave}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cf-company" className="form-label">
                Company
              </label>
              <input
                id="cf-company"
                type="text"
                className="form-input"
                placeholder="Your company name"
                autoComplete="organization"
                {...register('company')}
                onMouseEnter={cursorEnter}
                onMouseLeave={cursorLeave}
              />
            </div>
          </div>

          {/* Row 3: Service Interest + Project Type */}
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="cf-service" className="form-label">
                Service Interest
              </label>
              <select
                id="cf-service"
                className="form-select"
                {...register('serviceInterest')}
                onMouseEnter={cursorEnter}
                onMouseLeave={cursorLeave}
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cf-project-type" className="form-label">
                Project Type
              </label>
              <select
                id="cf-project-type"
                className="form-select"
                {...register('projectType')}
                onMouseEnter={cursorEnter}
                onMouseLeave={cursorLeave}
              >
                <option value="">Select project type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Emergency">Emergency</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 4: Message */}
          <div className="form-group form-group-full">
            <label htmlFor="cf-message" className="form-label">
              Message *
            </label>
            <textarea
              id="cf-message"
              className={`form-textarea${errors.message ? ' form-input-error' : ''}`}
              placeholder="Describe your project, the issue you're facing, or how we can help..."
              rows={6}
              {...register('message')}
              onMouseEnter={cursorEnter}
              onMouseLeave={cursorLeave}
            />
            {errors.message && (
              <span className="form-error">{errors.message.message}</span>
            )}
          </div>

          {/* Error banner */}
          {status === 'error' && (
            <div className="form-error-banner">
              <p className="form-error-banner-text">{errorMessage}</p>
              <button
                type="button"
                className="form-error-retry"
                onClick={handleRetry}
                onMouseEnter={cursorEnter}
                onMouseLeave={cursorLeave}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="form-submit"
            disabled={status === 'submitting'}
            onMouseEnter={cursorEnter}
            onMouseLeave={cursorLeave}
          >
            {status === 'submitting' ? (
              <span className="form-submit-loading">
                <span className="form-spinner" />
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
