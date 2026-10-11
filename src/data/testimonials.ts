export interface Testimonial {
  id: number;
  clientName: string;
  role: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    clientName: 'Thabo M.',
    role: 'HR Manager, ABC Corp',
    content:
      'Ndzalama transformed our training department. The facilitator programme was practical and immediately applicable. Our team is now SAQA-registered and fully operational.',
    rating: 5,
  },
  {
    id: 2,
    clientName: 'Lindiwe S.',
    role: 'Skills Development Facilitator, Limpopo DOE',
    content:
      'The SDF course was exactly what I needed to manage our WSP submissions with confidence. The trainers were knowledgeable and the content was up to date with current legislation.',
    rating: 5,
  },
  {
    id: 3,
    clientName: 'Mpho D.',
    role: 'ECD Practitioner',
    content:
      'The ECD programme gave me the foundational skills and qualification I needed to run my crèche professionally. I highly recommend Ndzalama to anyone in the childcare field.',
    rating: 4,
  },
  {
    id: 4,
    clientName: 'James K.',
    role: 'Training Manager, Mining Co.',
    content:
      "We sent a cohort of 12 staff for assessor training and the results were outstanding. Ndzalama's approach is both professional and engaging.",
    rating: 5,
  },
];
