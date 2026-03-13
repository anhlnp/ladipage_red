import './ServiceHero.css'

// Reusable hero section for service pages
const ServiceHero = ({
    tag,
    title,
    gradientText,
    description,
    ctaText,
    onCtaClick,
    children,
    backgroundImage,
    variant // 'default' | 'extended' - use 'extended' for long descriptions
}) => {
    const heroClass = `service-hero ${variant === 'extended' ? 'service-hero--extended' : ''} ${backgroundImage ? 'has-bg-image' : ''}`

    return (
        <section className={heroClass}>
            {backgroundImage && (
                <div className="service-hero-bg">
                    <img src={backgroundImage} alt="" />
                    <div className="service-hero-bg-overlay" />
                </div>
            )}
            <div className="service-hero-container">
                <div className="service-hero-content">
                    {tag && <span className="service-hero-tag">{tag}</span>}
                    <h1 className="service-hero-title">
                        {title}
                        {gradientText && (
                            <span className="gradient-text"> {gradientText}</span>
                        )}
                    </h1>
                    {description && (
                        <p className="service-hero-description">{description}</p>
                    )}
                    {ctaText && (
                        <button className="btn-primary" onClick={onCtaClick}>
                            {ctaText}
                        </button>
                    )}
                </div>
                {children && (
                    <div className="service-hero-extra">
                        {children}
                    </div>
                )}
            </div>
        </section>
    )
}

export default ServiceHero
