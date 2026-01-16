import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import './Blog.css'

// Blog posts data
export const blogPostsData = [
    {
        id: 'fiber-optics-400g-future',
        image: '/blog_fiber_cables.png',
        category: 'Technology',
        date: 'January 15, 2026',
        author: 'Select Tech Team',
        authorRole: 'Technical Experts',
        readTime: '8 min read',
        title: 'The Future of Fiber Optics: 400G and Beyond',
        excerpt: 'Explore how next-generation fiber optic technology is revolutionizing data center connectivity with speeds exceeding 400 Gbps.',
        tags: ['Fiber Optics', '400G', 'Data Center', 'Technology', 'Bandwidth']
    },
    {
        id: 'data-center-cable-management',
        image: '/blog_datacenter.png',
        category: 'Infrastructure',
        date: 'January 10, 2026',
        author: 'David Willis',
        authorRole: 'Founder & CEO',
        readTime: '6 min read',
        title: 'Best Practices for Data Center Cable Management',
        excerpt: 'Proper cable management is crucial for maintaining optimal airflow, simplifying troubleshooting, and ensuring scalability.',
        tags: ['Cable Management', 'Data Center', 'Best Practices', 'Infrastructure']
    },
    {
        id: 'preventive-maintenance-fiber',
        image: '/blog_technician.png',
        category: 'Maintenance',
        date: 'January 5, 2026',
        author: 'Technical Team',
        authorRole: 'Field Engineers',
        readTime: '7 min read',
        title: 'Preventive Maintenance: Maximizing Fiber Network Uptime',
        excerpt: 'Regular maintenance and proactive monitoring can prevent costly downtime. Discover essential maintenance routines.',
        tags: ['Maintenance', 'Fiber Network', 'Uptime', 'Best Practices']
    },
    {
        id: 'connecting-datacenter-cloud',
        image: '/blog_cloud.png',
        category: 'Cloud',
        date: 'December 28, 2025',
        author: 'Select Tech Team',
        authorRole: 'Technical Experts',
        readTime: '9 min read',
        title: 'Connecting Your Data Center to the Cloud',
        excerpt: 'Hybrid cloud architectures require robust fiber connectivity. Learn how to design and implement high-performance connections.',
        tags: ['Cloud', 'Hybrid', 'Data Center', 'Connectivity']
    }
]

const Blog = () => {
    const [activeFilter, setActiveFilter] = useState('All')
    const cardsRef = useRef([])

    const categories = ['All', 'Technology', 'Infrastructure', 'Maintenance', 'Cloud']

    const filteredPosts = activeFilter === 'All'
        ? blogPostsData
        : blogPostsData.filter(post => post.category === activeFilter)

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal')
                }
            })
        }, observerOptions)

        cardsRef.current.forEach(card => {
            if (card) observer.observe(card)
        })

        return () => observer.disconnect()
    }, [filteredPosts])

    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="blog-listing-hero">
                <h1>Insights & Resources</h1>
                <p>
                    Stay updated with the latest trends, best practices, and insights
                    in data center infrastructure and fiber optic technology.
                </p>
            </section>

            {/* Blog Listing */}
            <section className="blog-listing-section">
                <div className="blog-listing-container">
                    {/* Filter Tabs */}
                    <div className="blog-filters">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`blog-filter-btn ${activeFilter === category ? 'active' : ''}`}
                                onClick={() => setActiveFilter(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Blog Grid */}
                    <div className="blog-listing-grid">
                        {filteredPosts.map((post, idx) => (
                            <div
                                key={post.id}
                                className="blog-listing-card"
                                ref={el => cardsRef.current[idx] = el}
                            >
                                <Link to={`/blog/${post.id}`}>
                                    <div className="blog-listing-image">
                                        <img src={post.image} alt={post.title} />
                                        <span className="blog-listing-category">{post.category}</span>
                                    </div>
                                    <div className="blog-listing-content">
                                        <div className="blog-listing-meta">
                                            <span>
                                                <Calendar size={14} />
                                                {post.date}
                                            </span>
                                            <span>
                                                <User size={14} />
                                                {post.author}
                                            </span>
                                        </div>
                                        <h3>{post.title}</h3>
                                        <p>{post.excerpt}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="page-cta">
                <div className="cta-container">
                    <h2>Need Expert Guidance?</h2>
                    <p>Our team is ready to help you design the perfect infrastructure solution.</p>
                    <Link to="/contact" className="btn-primary">
                        Contact Us Today
                    </Link>
                </div>
            </section>
        </PageLayout>
    )
}

export default Blog
