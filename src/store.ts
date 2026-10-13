import { createContext, useContext } from 'react';
import { EditorState, Block, Page, BlockType, BlockStyle, ProjectSettings } from './types';
import { v4 as uuidv4 } from 'uuid';

export const defaultSettings: ProjectSettings = {
  title: 'Mi Sitio Web',
  primaryColor: '#4F46E5',
  secondaryColor: '#7C3AED',
  fontFamily: 'Inter, sans-serif',
  backgroundColor: '#ffffff',
};

export const createDefaultBlock = (type: BlockType): Block => {
  const defaults: Record<BlockType, Partial<Block>> = {
    heading: {
      content: 'Título Principal',
      style: { fontSize: '36px', fontWeight: '700', color: '#1a1a1a', textAlign: 'left', padding: '10px 0', fontFamily: 'Inter, sans-serif' },
    },
    paragraph: {
      content: 'Este es un párrafo de ejemplo. Haz clic para editarlo y escribir tu propio contenido. Puedes cambiar el tamaño de fuente, color, alineación y más.',
      style: { fontSize: '16px', color: '#4a4a4a', textAlign: 'left', padding: '10px 0', lineHeight: '1.6', fontFamily: 'Inter, sans-serif' },
    },
    image: {
      content: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
      style: { width: '100%', borderRadius: '8px', padding: '10px 0' },
      attributes: { alt: 'Imagen' },
    },
    button: {
      content: 'Haz Clic Aquí',
      style: { backgroundColor: '#4F46E5', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', textAlign: 'center', display: 'inline-block', border: 'none', cursor: 'pointer' },
      attributes: { href: '#' },
    },
    container: {
      content: '',
      style: { padding: '40px 20px', backgroundColor: '#f8f9fa', borderRadius: '0px', maxWidth: '1200px', margin: '0 auto', minHeight: '100px' },
      children: [],
    },
    columns: {
      content: '',
      style: { display: 'flex', gap: '20px', padding: '20px', flexDirection: 'row' },
      children: [
        { id: uuidv4(), type: 'container', content: '', style: { flex: '1', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', minHeight: '100px' }, children: [] },
        { id: uuidv4(), type: 'container', content: '', style: { flex: '1', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', minHeight: '100px' }, children: [] },
      ],
    },
    divider: {
      content: '',
      style: { border: '1px solid #e0e0e0', margin: '20px 0', width: '100%' },
    },
    spacer: {
      content: '',
      style: { height: '60px' },
    },
    video: {
      content: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      style: { width: '100%', height: '400px', borderRadius: '8px', padding: '10px 0' },
    },
    form: {
      content: '',
      style: { padding: '30px', backgroundColor: '#f8f9fa', borderRadius: '12px', maxWidth: '500px', margin: '0 auto' },
      children: [],
    },
    navbar: {
      content: '',
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: '0' },
      children: [],
    },
    hero: {
      content: '',
      style: { padding: '100px 40px', backgroundColor: 'linear-gradient(135deg, #4F46E5, #7C3AED)', textAlign: 'center', color: '#ffffff', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
      children: [
        { id: uuidv4(), type: 'heading', content: 'Bienvenido a Nuestro Sitio', style: { fontSize: '48px', fontWeight: '800', color: '#ffffff', marginBottom: '20px', textAlign: 'center' } },
        { id: uuidv4(), type: 'paragraph', content: 'Crea experiencias increíbles con nuestro editor visual. Sin código, sin complicaciones.', style: { fontSize: '20px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', textAlign: 'center', lineHeight: '1.6' } },
        { id: uuidv4(), type: 'button', content: 'Comenzar Ahora', style: { backgroundColor: '#ffffff', color: '#4F46E5', padding: '16px 32px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', marginTop: '30px', display: 'inline-block', border: 'none', cursor: 'pointer' } },
      ],
    },
    features: {
      content: '',
      style: { padding: '80px 40px', backgroundColor: '#ffffff', textAlign: 'center' },
      children: [
        { id: uuidv4(), type: 'heading', content: 'Nuestras Características', style: { fontSize: '36px', fontWeight: '700', color: '#1a1a1a', marginBottom: '50px', textAlign: 'center' } },
        { id: uuidv4(), type: 'columns', content: '', style: { display: 'flex', gap: '30px', maxWidth: '1000px', margin: '0 auto' }, children: [
          { id: uuidv4(), type: 'icon-box', content: '🚀', style: { flex: '1', padding: '30px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '12px' }, children: [
            { id: uuidv4(), type: 'heading', content: 'Rápido', style: { fontSize: '20px', fontWeight: '600', color: '#1a1a1a', textAlign: 'center' } },
            { id: uuidv4(), type: 'paragraph', content: 'Rendimiento optimizado para la mejor experiencia', style: { fontSize: '14px', color: '#666', textAlign: 'center' } },
          ]},
          { id: uuidv4(), type: 'icon-box', content: '🎨', style: { flex: '1', padding: '30px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '12px' }, children: [
            { id: uuidv4(), type: 'heading', content: 'Diseño', style: { fontSize: '20px', fontWeight: '600', color: '#1a1a1a', textAlign: 'center' } },
            { id: uuidv4(), type: 'paragraph', content: 'Herramientas de diseño profesionales integradas', style: { fontSize: '14px', color: '#666', textAlign: 'center' } },
          ]},
          { id: uuidv4(), type: 'icon-box', content: '🔒', style: { flex: '1', padding: '30px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '12px' }, children: [
            { id: uuidv4(), type: 'heading', content: 'Seguro', style: { fontSize: '20px', fontWeight: '600', color: '#1a1a1a', textAlign: 'center' } },
            { id: uuidv4(), type: 'paragraph', content: 'Protección avanzada para tus datos', style: { fontSize: '14px', color: '#666', textAlign: 'center' } },
          ]},
        ]},
      ],
    },
    testimonial: {
      content: '',
      style: { padding: '60px 40px', backgroundColor: '#f8f9fa', textAlign: 'center' },
      children: [
        { id: uuidv4(), type: 'heading', content: 'Lo que dicen nuestros clientes', style: { fontSize: '32px', fontWeight: '700', color: '#1a1a1a', marginBottom: '40px', textAlign: 'center' } },
        { id: uuidv4(), type: 'card', content: '"Este producto cambió completamente nuestra forma de trabajar. Lo recomiendo al 100%."', style: { padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }, children: [
          { id: uuidv4(), type: 'paragraph', content: '— María García, CEO de TechCorp', style: { fontSize: '14px', color: '#666', marginTop: '15px', textAlign: 'center' } },
        ]},
      ],
    },
    pricing: {
      content: '',
      style: { padding: '80px 40px', backgroundColor: '#ffffff', textAlign: 'center' },
      children: [
        { id: uuidv4(), type: 'heading', content: 'Planes y Precios', style: { fontSize: '36px', fontWeight: '700', color: '#1a1a1a', marginBottom: '50px', textAlign: 'center' } },
        { id: uuidv4(), type: 'columns', content: '', style: { display: 'flex', gap: '30px', maxWidth: '1000px', margin: '0 auto', justifyContent: 'center' }, children: [
          { id: uuidv4(), type: 'card', content: '', style: { flex: '1', padding: '40px 30px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center', border: '2px solid #e0e0e0' }, children: [
            { id: uuidv4(), type: 'heading', content: 'Básico', style: { fontSize: '22px', fontWeight: '600', color: '#1a1a1a', textAlign: 'center' } },
            { id: uuidv4(), type: 'heading', content: '$9/mes', style: { fontSize: '36px', fontWeight: '800', color: '#4F46E5', textAlign: 'center', margin: '15px 0' } },
            { id: uuidv4(), type: 'list', content: '✅ 5 Proyectos\n✅ Soporte Email\n✅ 1GB Almacenamiento', style: { textAlign: 'left', padding: '10px 0', lineHeight: '2', fontSize: '14px', color: '#555' } },
            { id: uuidv4(), type: 'button', content: 'Elegir Plan', style: { backgroundColor: '#4F46E5', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', marginTop: '20px', display: 'inline-block', width: '100%', textAlign: 'center' } },
          ]},
          { id: uuidv4(), type: 'card', content: '', style: { flex: '1', padding: '40px 30px', backgroundColor: '#4F46E5', borderRadius: '16px', boxShadow: '0 8px 30px rgba(79,70,229,0.3)', textAlign: 'center', transform: 'scale(1.05)' }, children: [
            { id: uuidv4(), type: 'heading', content: 'Pro', style: { fontSize: '22px', fontWeight: '600', color: '#ffffff', textAlign: 'center' } },
            { id: uuidv4(), type: 'heading', content: '$29/mes', style: { fontSize: '36px', fontWeight: '800', color: '#ffffff', textAlign: 'center', margin: '15px 0' } },
            { id: uuidv4(), type: 'list', content: '✅ Proyectos Ilimitados\n✅ Soporte Prioritario\n✅ 50GB Almacenamiento\n✅ Analytics Avanzado', style: { textAlign: 'left', padding: '10px 0', lineHeight: '2', fontSize: '14px', color: 'rgba(255,255,255,0.9)' } },
            { id: uuidv4(), type: 'button', content: 'Elegir Plan', style: { backgroundColor: '#ffffff', color: '#4F46E5', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', marginTop: '20px', display: 'inline-block', width: '100%', textAlign: 'center' } },
          ]},
          { id: uuidv4(), type: 'card', content: '', style: { flex: '1', padding: '40px 30px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center', border: '2px solid #e0e0e0' }, children: [
            { id: uuidv4(), type: 'heading', content: 'Enterprise', style: { fontSize: '22px', fontWeight: '600', color: '#1a1a1a', textAlign: 'center' } },
            { id: uuidv4(), type: 'heading', content: '$99/mes', style: { fontSize: '36px', fontWeight: '800', color: '#4F46E5', textAlign: 'center', margin: '15px 0' } },
            { id: uuidv4(), type: 'list', content: '✅ Todo en Pro\n✅ Soporte 24/7\n✅ Almacenamiento Ilimitado\n✅ API Access\n✅ White Label', style: { textAlign: 'left', padding: '10px 0', lineHeight: '2', fontSize: '14px', color: '#555' } },
            { id: uuidv4(), type: 'button', content: 'Contactar', style: { backgroundColor: '#4F46E5', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', marginTop: '20px', display: 'inline-block', width: '100%', textAlign: 'center' } },
          ]},
        ]},
      ],
    },
    footer: {
      content: '',
      style: { padding: '60px 40px 30px', backgroundColor: '#1a1a2e', color: '#ffffff' },
      children: [
        { id: uuidv4(), type: 'columns', content: '', style: { display: 'flex', gap: '40px', maxWidth: '1000px', margin: '0 auto', marginBottom: '40px' }, children: [
          { id: uuidv4(), type: 'container', content: '', style: { flex: '2' }, children: [
            { id: uuidv4(), type: 'heading', content: 'MiEmpresa', style: { fontSize: '24px', fontWeight: '700', color: '#ffffff', marginBottom: '15px' } },
            { id: uuidv4(), type: 'paragraph', content: 'Creamos soluciones digitales innovadoras para hacer crecer tu negocio.', style: { fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' } },
          ]},
          { id: uuidv4(), type: 'container', content: '', style: { flex: '1' }, children: [
            { id: uuidv4(), type: 'heading', content: 'Enlaces', style: { fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '15px' } },
            { id: uuidv4(), type: 'list', content: 'Inicio\nServicios\nBlog\nContacto', style: { fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '2' } },
          ]},
          { id: uuidv4(), type: 'container', content: '', style: { flex: '1' }, children: [
            { id: uuidv4(), type: 'heading', content: 'Contacto', style: { fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '15px' } },
            { id: uuidv4(), type: 'list', content: '📧 info@miempresa.com\n📱 +34 600 000 000\n📍 Madrid, España', style: { fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '2' } },
          ]},
        ]},
        { id: uuidv4(), type: 'divider', content: '', style: { border: '1px solid rgba(255,255,255,0.1)', margin: '20px 0' } },
        { id: uuidv4(), type: 'paragraph', content: '© 2024 MiEmpresa. Todos los derechos reservados.', style: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', textAlign: 'center' } },
      ],
    },
    gallery: {
      content: '',
      style: { padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' },
      children: [],
    },
    map: {
      content: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.8!2d-3.7037!3d40.4168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzAwLjUiTiAzwrA0MicxMy4zIlc!5e0!3m2!1ses!2ses!4v1234567890',
      style: { width: '100%', height: '400px', borderRadius: '8px', border: 'none' },
    },
    'icon-box': {
      content: '⭐',
      style: { padding: '30px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '12px', fontSize: '40px' },
      children: [],
    },
    list: {
      content: '• Elemento 1\n• Elemento 2\n• Elemento 3\n• Elemento 4',
      style: { fontSize: '16px', color: '#4a4a4a', padding: '10px 20px', lineHeight: '2' },
    },
    card: {
      content: '',
      style: { padding: '25px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', border: '1px solid #eee' },
      children: [],
    },
    cta: {
      content: '',
      style: { padding: '60px 40px', backgroundColor: 'linear-gradient(135deg, #4F46E5, #7C3AED)', textAlign: 'center', borderRadius: '0' },
      children: [
        { id: uuidv4(), type: 'heading', content: '¿Listo para comenzar?', style: { fontSize: '32px', fontWeight: '700', color: '#ffffff', marginBottom: '15px', textAlign: 'center' } },
        { id: uuidv4(), type: 'paragraph', content: 'Únete a miles de personas que ya confían en nosotros', style: { fontSize: '18px', color: 'rgba(255,255,255,0.85)', marginBottom: '30px', textAlign: 'center' } },
        { id: uuidv4(), type: 'button', content: 'Empezar Gratis', style: { backgroundColor: '#ffffff', color: '#4F46E5', padding: '14px 32px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', display: 'inline-block' } },
      ],
    },
    stats: {
      content: '',
      style: { padding: '60px 40px', backgroundColor: '#1a1a2e', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '20px' },
      children: [
        { id: uuidv4(), type: 'container', content: '', style: { textAlign: 'center', padding: '20px' }, children: [
          { id: uuidv4(), type: 'heading', content: '10K+', style: { fontSize: '42px', fontWeight: '800', color: '#4F46E5', textAlign: 'center' } },
          { id: uuidv4(), type: 'paragraph', content: 'Usuarios', style: { fontSize: '16px', color: 'rgba(255,255,255,0.7)', textAlign: 'center' } },
        ]},
        { id: uuidv4(), type: 'container', content: '', style: { textAlign: 'center', padding: '20px' }, children: [
          { id: uuidv4(), type: 'heading', content: '500+', style: { fontSize: '42px', fontWeight: '800', color: '#4F46E5', textAlign: 'center' } },
          { id: uuidv4(), type: 'paragraph', content: 'Proyectos', style: { fontSize: '16px', color: 'rgba(255,255,255,0.7)', textAlign: 'center' } },
        ]},
        { id: uuidv4(), type: 'container', content: '', style: { textAlign: 'center', padding: '20px' }, children: [
          { id: uuidv4(), type: 'heading', content: '99%', style: { fontSize: '42px', fontWeight: '800', color: '#4F46E5', textAlign: 'center' } },
          { id: uuidv4(), type: 'paragraph', content: 'Satisfacción', style: { fontSize: '16px', color: 'rgba(255,255,255,0.7)', textAlign: 'center' } },
        ]},
      ],
    },
    team: {
      content: '',
      style: { padding: '80px 40px', backgroundColor: '#ffffff', textAlign: 'center' },
      children: [
        { id: uuidv4(), type: 'heading', content: 'Nuestro Equipo', style: { fontSize: '36px', fontWeight: '700', color: '#1a1a1a', marginBottom: '50px', textAlign: 'center' } },
        { id: uuidv4(), type: 'columns', content: '', style: { display: 'flex', gap: '30px', maxWidth: '900px', margin: '0 auto', justifyContent: 'center' }, children: [
          { id: uuidv4(), type: 'card', content: '', style: { flex: '1', padding: '30px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '16px' }, children: [
            { id: uuidv4(), type: 'image', content: 'https://images.unsplash.com/photo-1472099645785-565123927054?w=200&h=200&fit=crop&crop=face', style: { width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 15px', objectFit: 'cover' as any } },
            { id: uuidv4(), type: 'heading', content: 'Carlos López', style: { fontSize: '18px', fontWeight: '600', color: '#1a1a1a', textAlign: 'center' } },
            { id: uuidv4(), type: 'paragraph', content: 'CEO & Fundador', style: { fontSize: '14px', color: '#4F46E5', textAlign: 'center' } },
          ]},
          { id: uuidv4(), type: 'card', content: '', style: { flex: '1', padding: '30px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '16px' }, children: [
            { id: uuidv4(), type: 'image', content: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', style: { width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 15px', objectFit: 'cover' as any } },
            { id: uuidv4(), type: 'heading', content: 'Ana Martínez', style: { fontSize: '18px', fontWeight: '600', color: '#1a1a1a', textAlign: 'center' } },
            { id: uuidv4(), type: 'paragraph', content: 'Directora de Diseño', style: { fontSize: '14px', color: '#4F46E5', textAlign: 'center' } },
          ]},
          { id: uuidv4(), type: 'card', content: '', style: { flex: '1', padding: '30px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '16px' }, children: [
            { id: uuidv4(), type: 'image', content: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', style: { width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 15px', objectFit: 'cover' as any } },
            { id: uuidv4(), type: 'heading', content: 'Miguel Torres', style: { fontSize: '18px', fontWeight: '600', color: '#1a1a1a', textAlign: 'center' } },
            { id: uuidv4(), type: 'paragraph', content: 'Lead Developer', style: { fontSize: '14px', color: '#4F46E5', textAlign: 'center' } },
          ]},
        ]},
      ],
    },
    faq: {
      content: '',
      style: { padding: '60px 40px', backgroundColor: '#f8f9fa', maxWidth: '800px', margin: '0 auto' },
      children: [
        { id: uuidv4(), type: 'heading', content: 'Preguntas Frecuentes', style: { fontSize: '32px', fontWeight: '700', color: '#1a1a1a', marginBottom: '30px', textAlign: 'center' } },
        { id: uuidv4(), type: 'accordion', content: '¿Cómo funciona el servicio?', style: { padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', marginBottom: '10px', fontSize: '16px', fontWeight: '600', color: '#1a1a1a', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' } },
        { id: uuidv4(), type: 'accordion', content: '¿Tienen soporte técnico?', style: { padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', marginBottom: '10px', fontSize: '16px', fontWeight: '600', color: '#1a1a1a', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' } },
        { id: uuidv4(), type: 'accordion', content: '¿Puedo cancelar en cualquier momento?', style: { padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', marginBottom: '10px', fontSize: '16px', fontWeight: '600', color: '#1a1a1a', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' } },
      ],
    },
    newsletter: {
      content: '',
      style: { padding: '60px 40px', backgroundColor: '#f0f0ff', textAlign: 'center', borderRadius: '0' },
      children: [
        { id: uuidv4(), type: 'heading', content: 'Suscríbete a nuestro Newsletter', style: { fontSize: '28px', fontWeight: '700', color: '#1a1a1a', marginBottom: '15px', textAlign: 'center' } },
        { id: uuidv4(), type: 'paragraph', content: 'Recibe las últimas noticias y ofertas exclusivas', style: { fontSize: '16px', color: '#666', marginBottom: '25px', textAlign: 'center' } },
        { id: uuidv4(), type: 'form', content: '', style: { display: 'flex', gap: '10px', maxWidth: '500px', margin: '0 auto', justifyContent: 'center' }, children: [
          { id: uuidv4(), type: 'button', content: 'Suscribirse', style: { backgroundColor: '#4F46E5', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', display: 'inline-block', border: 'none' } },
        ]},
      ],
    },
    'social-links': {
      content: '',
      style: { display: 'flex', gap: '15px', justifyContent: 'center', padding: '20px' },
      children: [],
    },
    countdown: {
      content: '',
      style: { padding: '60px 40px', backgroundColor: '#1a1a2e', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '30px' },
      children: [],
    },
    tabs: {
      content: '',
      style: { padding: '40px', backgroundColor: '#ffffff', borderRadius: '12px' },
      children: [],
    },
    accordion: {
      content: 'Pregunta frecuente',
      style: { padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', marginBottom: '10px', fontSize: '16px', fontWeight: '600', color: '#1a1a1a', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
    },
  };

  const blockDefaults = defaults[type] || { content: '', style: {} };
  return {
    id: uuidv4(),
    type,
    content: blockDefaults.content || '',
    style: blockDefaults.style || {},
    children: blockDefaults.children,
    attributes: blockDefaults.attributes,
    locked: false,
    hidden: false,
  };
};

export const createDefaultPage = (name: string = 'Inicio', isHome: boolean = true): Page => ({
  id: uuidv4(),
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
  blocks: [],
  isHome,
});

export const initialState: EditorState = {
  pages: [createDefaultPage()],
  currentPageId: '',
  selectedBlockId: null,
  hoveredBlockId: null,
  settings: defaultSettings,
  history: [],
  historyIndex: -1,
  viewMode: 'desktop',
  showPreview: false,
  showTemplates: false,
  showCodeExport: false,
  leftPanel: 'components',
  rightPanel: 'properties',
  zoom: 100,
};

export interface EditorContextType {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
}

export type EditorAction =
  | { type: 'SET_STATE'; payload: Partial<EditorState> }
  | { type: 'SELECT_BLOCK'; payload: string | null }
  | { type: 'HOVER_BLOCK'; payload: string | null }
  | { type: 'ADD_BLOCK'; payload: { block: Block; parentId?: string; index?: number } }
  | { type: 'UPDATE_BLOCK'; payload: { id: string; updates: Partial<Block> } }
  | { type: 'DELETE_BLOCK'; payload: string }
  | { type: 'DUPLICATE_BLOCK'; payload: string }
  | { type: 'MOVE_BLOCK'; payload: { id: string; direction: 'up' | 'down' } }
  | { type: 'SET_PAGE'; payload: string }
  | { type: 'ADD_PAGE'; payload: Page }
  | { type: 'DELETE_PAGE'; payload: string }
  | { type: 'UPDATE_PAGE'; payload: { id: string; updates: Partial<Page> } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<ProjectSettings> }
  | { type: 'SET_VIEW_MODE'; payload: 'desktop' | 'tablet' | 'mobile' }
  | { type: 'TOGGLE_PREVIEW' }
  | { type: 'TOGGLE_TEMPLATES' }
  | { type: 'TOGGLE_CODE_EXPORT' }
  | { type: 'SET_LEFT_PANEL'; payload: 'components' | 'pages' | 'templates' | 'layers' }
  | { type: 'SET_RIGHT_PANEL'; payload: 'properties' | 'styles' | 'settings' }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SAVE_HISTORY' }
  | { type: 'LOAD_TEMPLATE'; payload: Block[] }
  | { type: 'LOCK_BLOCK'; payload: string }
  | { type: 'TOGGLE_BLOCK_VISIBILITY'; payload: string };

export function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, ...action.payload };
    
    case 'SELECT_BLOCK':
      return { ...state, selectedBlockId: action.payload };
    
    case 'HOVER_BLOCK':
      return { ...state, hoveredBlockId: action.payload };
    
    case 'ADD_BLOCK': {
      const { block, parentId, index } = action.payload;
      const pages = state.pages.map(page => {
        if (page.id !== state.currentPageId) return page;
        if (parentId) {
          return { ...page, blocks: addChildBlock(page.blocks, parentId, block, index) };
        }
        const newBlocks = [...page.blocks];
        if (index !== undefined) {
          newBlocks.splice(index, 0, block);
        } else {
          newBlocks.push(block);
        }
        return { ...page, blocks: newBlocks };
      });
      return { ...state, pages, selectedBlockId: block.id };
    }
    
    case 'UPDATE_BLOCK': {
      const pages = state.pages.map(page => {
        if (page.id !== state.currentPageId) return page;
        return { ...page, blocks: updateBlockInTree(page.blocks, action.payload.id, action.payload.updates) };
      });
      return { ...state, pages };
    }
    
    case 'DELETE_BLOCK': {
      const pages = state.pages.map(page => {
        if (page.id !== state.currentPageId) return page;
        return { ...page, blocks: removeBlockFromTree(page.blocks, action.payload) };
      });
      return { ...state, pages, selectedBlockId: null };
    }
    
    case 'DUPLICATE_BLOCK': {
      const pages = state.pages.map(page => {
        if (page.id !== state.currentPageId) return page;
        return { ...page, blocks: duplicateBlockInTree(page.blocks, action.payload) };
      });
      return { ...state, pages };
    }
    
    case 'MOVE_BLOCK': {
      const pages = state.pages.map(page => {
        if (page.id !== state.currentPageId) return page;
        return { ...page, blocks: moveBlockInTree(page.blocks, action.payload.id, action.payload.direction) };
      });
      return { ...state, pages };
    }
    
    case 'SET_PAGE':
      return { ...state, currentPageId: action.payload, selectedBlockId: null };
    
    case 'ADD_PAGE':
      return { ...state, pages: [...state.pages, action.payload], currentPageId: action.payload.id };
    
    case 'DELETE_PAGE': {
      if (state.pages.length <= 1) return state;
      const newPages = state.pages.filter(p => p.id !== action.payload);
      const newCurrentPage = state.currentPageId === action.payload ? newPages[0].id : state.currentPageId;
      return { ...state, pages: newPages, currentPageId: newCurrentPage, selectedBlockId: null };
    }
    
    case 'UPDATE_PAGE': {
      const pages = state.pages.map(page => 
        page.id === action.payload.id ? { ...page, ...action.payload.updates } : page
      );
      return { ...state, pages };
    }
    
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    
    case 'TOGGLE_PREVIEW':
      return { ...state, showPreview: !state.showPreview };
    
    case 'TOGGLE_TEMPLATES':
      return { ...state, showTemplates: !state.showTemplates };
    
    case 'TOGGLE_CODE_EXPORT':
      return { ...state, showCodeExport: !state.showCodeExport };
    
    case 'SET_LEFT_PANEL':
      return { ...state, leftPanel: action.payload };
    
    case 'SET_RIGHT_PANEL':
      return { ...state, rightPanel: action.payload };
    
    case 'SET_ZOOM':
      return { ...state, zoom: action.payload };
    
    case 'UNDO': {
      if (state.historyIndex <= 0) return state;
      const newIndex = state.historyIndex - 1;
      return { ...state, pages: state.history[newIndex], historyIndex: newIndex };
    }
    
    case 'REDO': {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIndex = state.historyIndex + 1;
      return { ...state, pages: state.history[newIndex], historyIndex: newIndex };
    }
    
    case 'SAVE_HISTORY': {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(state.pages)));
      return { ...state, history: newHistory, historyIndex: newHistory.length - 1 };
    }
    
    case 'LOAD_TEMPLATE': {
      const pages = state.pages.map(page => {
        if (page.id !== state.currentPageId) return page;
        return { ...page, blocks: action.payload };
      });
      return { ...state, pages, selectedBlockId: null };
    }
    
    case 'LOCK_BLOCK': {
      const pages = state.pages.map(page => {
        if (page.id !== state.currentPageId) return page;
        return { ...page, blocks: toggleLockBlock(page.blocks, action.payload) };
      });
      return { ...state, pages };
    }
    
    case 'TOGGLE_BLOCK_VISIBILITY': {
      const pages = state.pages.map(page => {
        if (page.id !== state.currentPageId) return page;
        return { ...page, blocks: toggleVisibilityBlock(page.blocks, action.payload) };
      });
      return { ...state, pages };
    }
    
    default:
      return state;
  }
}

function addChildBlock(blocks: Block[], parentId: string, newBlock: Block, index?: number): Block[] {
  return blocks.map(block => {
    if (block.id === parentId) {
      const children = [...(block.children || [])];
      if (index !== undefined) {
        children.splice(index, 0, newBlock);
      } else {
        children.push(newBlock);
      }
      return { ...block, children };
    }
    if (block.children) {
      return { ...block, children: addChildBlock(block.children, parentId, newBlock, index) };
    }
    return block;
  });
}

function updateBlockInTree(blocks: Block[], id: string, updates: Partial<Block>): Block[] {
  return blocks.map(block => {
    if (block.id === id) {
      return { ...block, ...updates };
    }
    if (block.children) {
      return { ...block, children: updateBlockInTree(block.children, id, updates) };
    }
    return block;
  });
}

function removeBlockFromTree(blocks: Block[], id: string): Block[] {
  return blocks
    .filter(block => block.id !== id)
    .map(block => {
      if (block.children) {
        return { ...block, children: removeBlockFromTree(block.children, id) };
      }
      return block;
    });
}

function duplicateBlockInTree(blocks: Block[], id: string): Block[] {
  const result: Block[] = [];
  for (const block of blocks) {
    result.push(block);
    if (block.id === id) {
      const clone = JSON.parse(JSON.stringify(block));
      const reassignIds = (b: Block): Block => ({
        ...b,
        id: uuidv4(),
        children: b.children?.map(reassignIds),
      });
      result.push(reassignIds(clone));
    }
    if (block.children) {
      result[result.length - (block.id === id ? 1 : 1)] = {
        ...result[result.length - 1],
        children: duplicateBlockInTree(block.children, id),
      };
    }
  }
  return result;
}

function moveBlockInTree(blocks: Block[], id: string, direction: 'up' | 'down'): Block[] {
  const index = blocks.findIndex(b => b.id === id);
  if (index === -1) {
    return blocks.map(block => {
      if (block.children) {
        return { ...block, children: moveBlockInTree(block.children, id, direction) };
      }
      return block;
    });
  }
  const newBlocks = [...blocks];
  const newIndex = direction === 'up' ? index - 1 : index + 1;
  if (newIndex < 0 || newIndex >= newBlocks.length) return blocks;
  [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
  return newBlocks;
}

function toggleLockBlock(blocks: Block[], id: string): Block[] {
  return blocks.map(block => {
    if (block.id === id) return { ...block, locked: !block.locked };
    if (block.children) return { ...block, children: toggleLockBlock(block.children, id) };
    return block;
  });
}

function toggleVisibilityBlock(blocks: Block[], id: string): Block[] {
  return blocks.map(block => {
    if (block.id === id) return { ...block, hidden: !block.hidden };
    if (block.children) return { ...block, children: toggleVisibilityBlock(block.children, id) };
    return block;
  });
}

export const EditorContext = createContext<EditorContextType>({
  state: initialState,
  dispatch: () => {},
});

export const useEditor = () => useContext(EditorContext);
