'use client'

import { useState } from 'react'
import { CheckCircle2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'

type Errors = Partial<Record<string, string>>

const PRODUCT_OPTIONS = [
  "Women's Knit Sweaters & Cardigans",
  "Women's Knit Base Layers",
  'Yunjian Huaxu Hand-Embroidered Wool Knit Cardigan',
  '3D Embossed Butterfly Hollow-Out Knit Base Layer',
  'White Tea Openwork Ribbed Knit Sweater',
  "Custom OEM/ODM Women's Knit Vests & Pullovers",
]

const selectClass =
  'h-10 w-full rounded-md border border-hairline bg-white px-3 text-sm text-ink shadow-xs outline-none transition-colors focus-visible:border-blueprint focus-visible:ring-2 focus-visible:ring-blueprint/30'

export function RfqForm({
  defaultProduct = '',
  captchaScope = 'contact-rfq',
  sourcePage = '/contact',
}: {
  defaultProduct?: string
  captchaScope?: string
  sourcePage?: string
}) {
  const [captchaSrc, setCaptchaSrc] = useState(`/api/captcha?scope=${encodeURIComponent(captchaScope)}`)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const refresh = () =>
    setCaptchaSrc(`/api/captcha?scope=${encodeURIComponent(captchaScope)}&t=${Date.now()}`)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const payload = {
      ...Object.fromEntries(new FormData(form).entries()),
      captchaScope,
      sourcePage,
    }
    setSubmitting(true)
    setErrors({})
    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (res.ok) {
        setDone(true)
        form.reset()
      } else {
        setErrors(json.errors ?? { form: json.error ?? 'Something went wrong. Please try again.' })
        refresh()
      }
    } catch {
      setErrors({ form: 'Network error. Please try again or email info@xgzzfs.com directly.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div
        role="status"
        className="flex h-full min-h-80 flex-col items-start justify-center gap-4 rounded-2xl border border-hairline bg-white p-8"
      >
        <CheckCircle2 className="size-9 text-blueprint" aria-hidden="true" />
        <h3 className="text-2xl font-semibold text-ink">Inquiry Received</h3>
        <p className="max-w-md text-sm leading-relaxed text-slate">
          Thank you for contacting Suzhou Xigong Knitting Apparel Co., Ltd. Our merchandising team will review your requirements and follow up via email.
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => {
            setDone(false)
            refresh()
          }}
        >
          Send Another Inquiry
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      data-captcha-scope={captchaScope}
      className="flex h-full flex-col rounded-2xl border border-hairline bg-white p-6 sm:p-8"
    >
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor={`${captchaScope}-name`}>Name *</FieldLabel>
            <Input
              id={`${captchaScope}-name`}
              name="name"
              placeholder="Your name"
              autoComplete="name"
              required
              aria-invalid={!!errors.name}
            />
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </Field>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor={`${captchaScope}-email`}>Work Email *</FieldLabel>
            <Input
              id={`${captchaScope}-email`}
              name="email"
              type="email"
              placeholder="name@company.com"
              autoComplete="email"
              required
              aria-invalid={!!errors.email}
            />
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor={`${captchaScope}-company`}>Company / Brand</FieldLabel>
          <Input
            id={`${captchaScope}-company`}
            name="company"
            placeholder="Company or fashion brand name"
            autoComplete="organization"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor={`${captchaScope}-product`}>Product Interest</FieldLabel>
            <select
              id={`${captchaScope}-product`}
              name="product"
              defaultValue={defaultProduct || PRODUCT_OPTIONS[0]}
              className={selectClass}
            >
              {PRODUCT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Field>
          <Field>
            <FieldLabel htmlFor={`${captchaScope}-quantity`}>Estimated Quantity (MOQ 5 pcs)</FieldLabel>
            <Input
              id={`${captchaScope}-quantity`}
              name="quantity"
              placeholder="e.g. 50 pcs trial / 2,000 pcs bulk"
            />
          </Field>
        </div>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor={`${captchaScope}-message`}>Project Brief / Specifications *</FieldLabel>
          <Textarea
            id={`${captchaScope}-message`}
            name="message"
            rows={4}
            placeholder="Share target style, yarn preference, colorways, sizing, or private-label requirements..."
            required
            aria-invalid={!!errors.message}
          />
          {errors.message && <FieldError>{errors.message}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.captcha}>
          <FieldLabel htmlFor={`${captchaScope}-captcha`}>Verification Code *</FieldLabel>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              id={`${captchaScope}-captcha`}
              name="captcha"
              maxLength={4}
              autoComplete="off"
              placeholder="4-char code"
              className="w-44 uppercase tracking-widest"
              required
              aria-invalid={!!errors.captcha}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={captchaSrc}
              alt="4-character verification code"
              width={132}
              height={42}
              className="h-[42px] w-[132px] rounded-md border border-hairline bg-porcelain object-contain"
            />
            <button
              type="button"
              onClick={refresh}
              aria-label="Refresh verification code"
              className="inline-flex size-10 items-center justify-center rounded-md border border-hairline bg-porcelain text-slate transition-colors hover:border-ink/40 hover:text-ink"
            >
              <RefreshCw className="size-4" />
            </button>
          </div>
          {errors.captcha && <FieldError>{errors.captcha}</FieldError>}
        </Field>

        {errors.form && (
          <p role="alert" className="text-sm font-medium text-destructive">
            {errors.form}
          </p>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            disabled={submitting}
            className="h-11 w-full rounded-full bg-ink px-6 text-sm font-medium text-white hover:bg-ink/90 sm:w-auto"
          >
            {submitting ? (
              <>
                <Spinner className="mr-2 size-4" />
                Sending Inquiry...
              </>
            ) : (
              'Submit OEM / ODM Inquiry'
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
