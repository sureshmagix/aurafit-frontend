import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Camera, Upload, X } from 'lucide-react'
import api from '../services/api'
import ProductCard from '../components/product/ProductCard'
import Loader from '../components/common/Loader'
import EmptyState from '../components/common/EmptyState'

function AuraMatchPage() {
  const [step, setStep] = useState('input') // 'input' | 'loading' | 'results'
  const [formData, setFormData] = useState({
    occasion: '',
    style: '',
    colors: [],
    photo: null
  })
  const [results, setResults] = useState([])
  const [error, setError] = useState('')

  // New states for camera
  const [cameraMode, setCameraMode] = useState(false)
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const fileInputRef = useRef(null)

  // Camera start
  const startCamera = async () => {
      try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
          setStream(mediaStream)
          setCameraMode(true)
          if (videoRef.current) {
              videoRef.current.srcObject = mediaStream
          }
      } catch (err) {
          setError('Could not access camera. Please check permissions.')
      }
  }

  const stopCamera = () => {
      if (stream) {
          stream.getTracks().forEach(track => track.stop())
          setStream(null)
      }
      setCameraMode(false)
  }

  const capturePhoto = () => {
      if (videoRef.current) {
          const canvas = document.createElement('canvas')
          canvas.width = videoRef.current.videoWidth
          canvas.height = videoRef.current.videoHeight
          const ctx = canvas.getContext('2d')
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
          const dataUrl = canvas.toDataURL('image/jpeg')
          setFormData(prev => ({ ...prev, photo: dataUrl }))
          stopCamera()
      }
  }

  const handleFileUpload = (e) => {
      const file = e.target.files[0]
      if (file) {
          const reader = new FileReader()
          reader.onloadend = () => {
              setFormData(prev => ({ ...prev, photo: reader.result }))
          }
          reader.readAsDataURL(file)
      }
  }

  // Effect to clean up stream on unmount
  useEffect(() => {
      return () => {
          if (stream) {
              stream.getTracks().forEach(track => track.stop())
          }
      }
  }, [stream])

  const availableColors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Pink', 'Yellow', 'Beige', 'Navy', 'Maroon']

  const toggleColor = (col) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(col) 
        ? prev.colors.filter(c => c !== col)
        : [...prev.colors, col]
    }))
  }

  const handleMatch = async (e) => {
    e.preventDefault()
    setStep('loading')
    try {
      const response = await api.post('/match/suggest', {
        occasion: formData.occasion,
        style: formData.style,
        preferredColors: formData.colors,
        photo: formData.photo
      })
      
      setResults(response.data.data || response.data || [])
      setStep('results')
    } catch (err) {
      setError('Failed to securely connect to the Aura Match engine.')
      setStep('input')
    }
  }

  if (step === 'loading') {
    return (
      <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader text="Aura AI is analyzing your wardrobe history and preferences..." />
      </section>
    )
  }

  if (step === 'results') {
    return (
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
             <div>
               <h1 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={28} color="var(--primary)" /> Your Perfect Aura Matches
               </h1>
               <p className="section-subtitle">Specially curated selections blending your purchase history with your requests.</p>
             </div>
             <button className="btn btn-secondary" onClick={() => setStep('input')}>Try Another Match</button>
          </div>

          {results.length > 0 ? (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {results.map((product) => (
                <div key={product._id} style={{ position: 'relative' }}>
                  <div style={{ 
                      position: 'absolute', 
                      bottom: '100%', 
                      left: 0, 
                      right: 0, 
                      background: 'linear-gradient(135deg, var(--primary), var(--text))', 
                      color: 'white', 
                      padding: '0.6rem 1rem', 
                      borderTopLeftRadius: 'var(--radius)', 
                      borderTopRightRadius: 'var(--radius)', 
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      transform: 'translateY(8px)',
                      zIndex: -1
                  }}>
                      <Sparkles size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'text-bottom' }} /> 
                      {product.matchReason}
                  </div>
                  <div style={{ zIndex: 10, position: 'relative', background: 'white' }}>
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <EmptyState title="No perfect matches found" description="Try modifying your preferences to find better options." />
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 700 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 className="section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem' }}>
                <Sparkles size={32} color="var(--primary)" /> Aura Match AI
            </h1>
            <p className="section-subtitle">Let our smart recommender find the perfect pieces based on your past orders and current vibe.</p>
        </div>

        <div className="card" style={{ padding: '3rem 2rem' }}>
            {error && <p className="error-text" style={{ marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleMatch} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                <div>
                   <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem' }}>What's the Occasion?</label>
                   <input 
                      type="text" 
                      className="input" 
                      placeholder="e.g. Summer Beach Party, Formal Office Dinner, Casual Weekend..." 
                      value={formData.occasion}
                      onChange={(e) => setFormData({...formData, occasion: e.target.value})}
                      required
                   />
                </div>

                <div>
                   <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem' }}>Describe your ideal style/fit</label>
                   <textarea 
                      className="input" 
                      placeholder="e.g. I want something breathable and elegant, preferably with a loose fit."
                      value={formData.style}
                      onChange={(e) => setFormData({...formData, style: e.target.value})}
                      rows={3}
                   />
                </div>

                <div>
                   <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.8rem' }}>Preferred Colors</label>
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {availableColors.map(col => {
                          const isSelected = formData.colors.includes(col);
                          return (
                             <button 
                                key={col} 
                                type="button"
                                onClick={() => toggleColor(col)}
                                style={{
                                    border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                                    background: isSelected ? 'var(--primary)' : 'transparent',
                                    color: isSelected ? 'white' : 'var(--text)',
                                    borderRadius: '2rem',
                                    padding: '0.4rem 1rem',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                             >
                                {col}
                             </button>
                          )
                      })}
                   </div>
                </div>

                {/* Photo Section */}
                <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem' }}>Your Current Vibe (Optional Photo)</label>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '1rem' }}>Upload or take a photo of an item you want to match with, or just your current look!</p>
                    
                    {!formData.photo && !cameraMode && (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button 
                                type="button" 
                                onClick={() => fileInputRef.current?.click()}
                                style={{ flex: 1, padding: '1rem', border: `1px dashed var(--border)`, borderRadius: 'var(--radius)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'transparent', cursor: 'pointer' }}
                            >
                                <Upload size={24} color="var(--primary)" />
                                <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>Upload Photo</span>
                            </button>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                style={{ display: 'none' }} 
                                accept="image/*" 
                                onChange={handleFileUpload} 
                            />
                            
                            <button 
                                type="button" 
                                onClick={startCamera}
                                style={{ flex: 1, padding: '1rem', border: `1px dashed var(--border)`, borderRadius: 'var(--radius)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'transparent', cursor: 'pointer' }}
                            >
                                <Camera size={24} color="var(--primary)" />
                                <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>Take Photo</span>
                            </button>
                        </div>
                    )}

                    {cameraMode && (
                        <div style={{ position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden', background: '#000', marginTop: '0.5rem' }}>
                            <video 
                                ref={videoRef} 
                                autoPlay 
                                playsInline 
                                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', display: 'block' }} 
                            />
                            <div style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                <button 
                                    type="button" 
                                    onClick={capturePhoto}
                                    style={{ background: 'var(--primary)', color: 'white', padding: '0.6rem 1.5rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
                                >
                                    Capture
                                </button>
                                <button 
                                    type="button" 
                                    onClick={stopCamera}
                                    style={{ background: 'white', color: 'var(--text)', padding: '0.6rem 1.5rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {formData.photo && (
                        <div style={{ position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden', border: `1px solid var(--border)`, display: 'inline-block' }}>
                            <img src={formData.photo} alt="Your vibe" style={{ width: '100%', objectFit: 'cover', display: 'block' }} />
                            <button 
                                type="button"
                                onClick={() => setFormData({...formData, photo: null})}
                                style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '1rem' }}>
                   <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                       Find My Match <ArrowRight size={18} />
                   </button>
                </div>

            </form>
        </div>
      </div>
    </section>
  )
}

export default AuraMatchPage
