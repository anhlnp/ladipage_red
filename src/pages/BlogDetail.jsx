import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin, Facebook, Info } from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import { blogPostsData } from './Blog'
import './Blog.css'

// Full blog content for each post
const blogContent = {
    'fiber-optics-100g-enterprise': {
        content: `
            <p>Modern data centers rely on high-speed fiber optic connectivity to support business operations. With speeds ranging from 10 Gbps to 100 Gbps, today's enterprise fiber solutions provide the bandwidth and reliability businesses need for their critical applications.</p>

            <h2>The Evolution of Enterprise Fiber</h2>
            <p>Over the past decade, we've witnessed significant growth in enterprise network speeds. What started with 1G connections has progressed to 10G, 40G, and now 100G as the standard for high-performance enterprise environments. These speeds adequately serve the vast majority of business applications including cloud connectivity, data replication, and unified communications.</p>
            
            <p>For most small and medium businesses, 10G connectivity provides excellent performance. Larger enterprises with demanding workloads benefit from 40G or 100G solutions.</p>

            <h2>Choosing the Right Speed for Your Business</h2>
            <p>Selecting the appropriate fiber speed depends on several factors:</p>
            
            <ul>
                <li><strong>10G Solutions:</strong> Ideal for small to medium businesses, branch offices, and standard enterprise applications. Cost-effective and widely supported.</li>
                <li><strong>40G Solutions:</strong> Perfect for growing businesses with increasing bandwidth demands, server clusters, and high-traffic applications.</li>
                <li><strong>100G Solutions:</strong> Best suited for large enterprises, data centers, and organizations with heavy data transfer requirements.</li>
            </ul>

            <h2>Implementation Considerations</h2>
            <p>Deploying fiber infrastructure requires careful planning. Here are key factors to consider:</p>

            <h3>Fiber Type Selection</h3>
            <p>Single-mode fiber (SMF) remains the preferred choice for longer distances, especially beyond 300 meters. For shorter reaches within buildings, multimode fiber with OM3 or OM4 specifications offers a cost-effective solution.</p>

            <h3>Structured Cabling Requirements</h3>
            <p>Your cabling infrastructure should be designed for current needs plus future growth. Quality fiber connections with minimal insertion loss ensure optimal performance and longevity.</p>

            <blockquote>
                "Investing in quality fiber infrastructure today means your network will be ready for tomorrow's demands without costly upgrades."
            </blockquote>

            <h2>Planning for Growth</h2>
            <p>While 10G to 100G speeds serve current enterprise needs well, forward-thinking organizations should design their infrastructure with growth in mind. This means installing fiber pathways that can accommodate future upgrades without major reconstructive work.</p>

            <h3>Key Recommendations</h3>
            <ul>
                <li>Assess your current bandwidth usage and project 3-5 year growth</li>
                <li>Invest in high-quality single-mode fiber for backbone connections</li>
                <li>Choose cable management systems that allow for easy upgrades</li>
                <li>Work with certified installers who understand enterprise requirements</li>
                <li>Implement comprehensive testing and documentation practices</li>
            </ul>

            <h2>How Select Tech Can Help</h2>
            <p>At Select Tech, we specialize in designing and implementing enterprise fiber optic infrastructure. Our certified engineers have extensive experience with 10G through 100G deployments and can help you:</p>
            
            <ul>
                <li>Assess your current infrastructure and identify the right solution</li>
                <li>Design optimized cable pathways and layouts</li>
                <li>Install and certify high-performance fiber systems</li>
                <li>Provide ongoing maintenance and support</li>
            </ul>

            <p>Ready to upgrade your network infrastructure? Contact our team today to discuss your fiber connectivity needs.</p>
        `
    },
    'data-center-cable-management': {
        content: `
            <p>In the fast-paced world of data centers, proper cable management is often overlooked – but it shouldn't be. Effective cable management directly impacts your data center's efficiency, maintainability, and scalability. Let's explore the best practices that separate world-class data centers from the rest.</p>

            <h2>Why Cable Management Matters</h2>
            <p>Poor cable management creates a cascade of problems that extend far beyond aesthetics:</p>
            
            <ul>
                <li><strong>Airflow Obstruction:</strong> Tangled cables block hot/cold aisle containment, increasing cooling costs by up to 30%</li>
                <li><strong>Troubleshooting Delays:</strong> Finding and tracing cables in a messy environment can extend outage times significantly</li>
                <li><strong>Safety Hazards:</strong> Improperly routed cables can create trip hazards and increase fire risk</li>
                <li><strong>Scalability Issues:</strong> Disorganized infrastructure makes it difficult to add new equipment or make changes</li>
            </ul>

            <h2>The Foundation: Structured Cabling Systems</h2>
            <p>A well-designed structured cabling system is the backbone of effective cable management. This includes:</p>

            <h3>Overhead Cable Trays</h3>
            <p>Ladder racks and cable trays provide dedicated pathways for cables running between rows. They should be sized to accommodate current needs plus 30-50% growth capacity.</p>

            <h3>Vertical Cable Managers</h3>
            <p>These run along the sides of racks, organizing cables as they travel from horizontal runs to individual equipment. Choose managers with adequate finger space and clear front covers for visibility.</p>

            <h3>Horizontal Cable Managers</h3>
            <p>Installed between equipment in racks, these organize patch cables and prevent them from hanging loosely. D-ring or brush-style managers offer flexibility while maintaining organization.</p>

            <blockquote>
                "A well-organized data center isn't just beautiful – it's a competitive advantage that reduces operational costs and enables faster deployment."
            </blockquote>

            <h2>Color Coding Standards</h2>
            <p>Implementing a consistent color coding scheme dramatically improves troubleshooting and maintenance:</p>
            
            <ul>
                <li><strong>Blue:</strong> Standard network connections</li>
                <li><strong>Yellow:</strong> PoE (Power over Ethernet) connections</li>
                <li><strong>Orange:</strong> Fiber optic multimode</li>
                <li><strong>Yellow/Green:</strong> Fiber optic single-mode</li>
                <li><strong>Red:</strong> Management/IPMI connections</li>
                <li><strong>Black:</strong> Cross-connects or special circuits</li>
            </ul>

            <h2>Labeling Best Practices</h2>
            <p>Every cable should be labeled at both ends with durable, machine-printed labels. Include:</p>
            
            <ul>
                <li>Source rack and port</li>
                <li>Destination rack and port</li>
                <li>Cable type and length</li>
                <li>Installation date</li>
                <li>Circuit ID (if applicable)</li>
            </ul>

            <h2>Documentation and DCIM</h2>
            <p>Data Center Infrastructure Management (DCIM) software helps track every cable, connection, and port in your facility. Benefits include:</p>
            
            <ul>
                <li>Visual mapping of all connections</li>
                <li>Automated impact analysis for changes</li>
                <li>Capacity planning and optimization</li>
                <li>Integration with ticketing systems</li>
            </ul>

            <h2>Regular Audits and Maintenance</h2>
            <p>Cable management isn't a one-time project – it requires ongoing attention:</p>
            
            <ul>
                <li>Conduct quarterly visual inspections</li>
                <li>Remove abandoned cables immediately</li>
                <li>Verify documentation accuracy annually</li>
                <li>Retrain staff on standards regularly</li>
            </ul>

            <h2>Select Tech's Cable Management Services</h2>
            <p>Our team provides comprehensive cable management solutions including:</p>
            
            <ul>
                <li>Infrastructure assessment and remediation planning</li>
                <li>Structured cabling design and installation</li>
                <li>Cable audit and documentation services</li>
                <li>Training for your operations team</li>
            </ul>

            <p>Don't let cable chaos slow your business down. Contact Select Tech today for a free assessment of your data center's cable management.</p>
        `
    },
    'preventive-maintenance-fiber': {
        content: `
            <p>Fiber optic networks are the lifeline of modern businesses. When they fail, the consequences can be catastrophic – from lost revenue to damaged reputation. The good news? Most fiber network failures are preventable with proper maintenance practices.</p>

            <h2>Understanding Fiber Failure Modes</h2>
            <p>Before discussing prevention, let's understand what causes fiber networks to fail:</p>
            
            <ul>
                <li><strong>Connector Contamination:</strong> The #1 cause of fiber problems. Microscopic dust particles can block light transmission.</li>
                <li><strong>Physical Damage:</strong> Excessive bend radius, crushing, or tension can break fiber strands.</li>
                <li><strong>Environmental Factors:</strong> Temperature extremes, moisture, and UV exposure degrade fiber over time.</li>
                <li><strong>Poor Splices:</strong> Improperly performed fusion or mechanical splices create high-loss points.</li>
                <li><strong>Transceiver Failure:</strong> Optical transceivers have a finite lifespan and can fail without warning.</li>
            </ul>

            <h2>The Preventive Maintenance Schedule</h2>
            
            <h3>Daily Monitoring</h3>
            <p>Implement automated monitoring for:</p>
            <ul>
                <li>Optical power levels at key points</li>
                <li>Error rates and CRC counts</li>
                <li>Environmental conditions (temperature, humidity)</li>
                <li>Equipment alarms and alerts</li>
            </ul>

            <h3>Monthly Tasks</h3>
            <ul>
                <li>Review monitoring trends for anomalies</li>
                <li>Inspect visible fiber runs for damage</li>
                <li>Verify patch panel organization</li>
                <li>Check for proper bend radius compliance</li>
            </ul>

            <h3>Quarterly Tasks</h3>
            <ul>
                <li>Clean all active fiber connections</li>
                <li>Inspect connector end faces with microscope</li>
                <li>Verify labeling accuracy</li>
                <li>Test spare fiber paths</li>
            </ul>

            <h3>Annual Tasks</h3>
            <ul>
                <li>Perform OTDR testing on critical links</li>
                <li>Update network documentation</li>
                <li>Review and refresh maintenance procedures</li>
                <li>Conduct training for operations staff</li>
            </ul>

            <blockquote>
                "An ounce of prevention is worth a pound of cure. In fiber networks, that translates to thousands of dollars saved per prevented outage."
            </blockquote>

            <h2>Essential Testing Equipment</h2>
            <p>Proper maintenance requires proper tools:</p>
            
            <ul>
                <li><strong>Fiber Inspection Microscope:</strong> Essential for viewing connector end faces at 200-400x magnification</li>
                <li><strong>Optical Power Meter:</strong> Measures light levels to verify link performance</li>
                <li><strong>Visual Fault Locator (VFL):</strong> Uses visible red light to identify breaks and bends</li>
                <li><strong>OTDR (Optical Time Domain Reflectometer):</strong> Provides complete link characterization including events details</li>
                <li><strong>Cleaning Supplies:</strong> Lint-free wipes, IPA solution, and one-click cleaners</li>
            </ul>

            <h2>Proper Cleaning Procedures</h2>
            <p>Follow this process for every fiber connection:</p>
            
            <ol>
                <li>Inspect the connector with a microscope before cleaning</li>
                <li>Use appropriate cleaning method based on contamination level</li>
                <li>Re-inspect after cleaning to verify cleanliness</li>
                <li>Document the cleaning in your maintenance log</li>
                <li>Never touch a cleaned connector before mating</li>
            </ol>

            <h2>Building a Maintenance Culture</h2>
            <p>Technology alone isn't enough – you need the right organizational practices:</p>
            
            <ul>
                <li>Establish clear maintenance SOPs and checklists</li>
                <li>Train all staff who interact with fiber</li>
                <li>Track and analyze maintenance metrics</li>
                <li>Reward proactive issue identification</li>
                <li>Conduct regular maintenance reviews</li>
            </ul>

            <h2>Select Tech Maintenance Programs</h2>
            <p>We offer comprehensive maintenance programs tailored to your needs:</p>
            
            <ul>
                <li><strong>Basic:</strong> Quarterly inspections and cleaning</li>
                <li><strong>Standard:</strong> Monthly monitoring reviews plus quarterly on-site service</li>
                <li><strong>Premium:</strong> 24/7 monitoring, priority response, and comprehensive annual testing</li>
            </ul>

            <p>Protect your investment and ensure maximum uptime. Contact Select Tech to discuss a maintenance program that fits your needs.</p>
        `
    },
    'connecting-datacenter-cloud': {
        content: `
            <p>The hybrid cloud has become the dominant architecture for modern enterprises. But connecting your on-premises data center to public cloud providers requires careful planning and robust infrastructure. In this guide, we'll explore the key considerations for building high-performance hybrid connections.</p>

            <h2>Understanding Hybrid Connectivity Options</h2>
            <p>There are several ways to connect your data center to cloud providers:</p>

            <h3>Public Internet VPN</h3>
            <p>The simplest option – create encrypted tunnels over the public internet. While cost-effective, it suffers from variable latency and limited bandwidth guarantees.</p>

            <h3>Dedicated Connections</h3>
            <p>Services like AWS Direct Connect, Azure ExpressRoute, and Google Cloud Interconnect provide private, dedicated links to cloud providers. Benefits include:</p>
            <ul>
                <li>Consistent, low-latency performance</li>
                <li>Higher bandwidth options (up to 100 Gbps)</li>
                <li>Reduced data transfer costs</li>
                <li>Enhanced security (traffic doesn't traverse public internet)</li>
            </ul>

            <h3>Carrier-Based Solutions</h3>
            <p>Network service providers offer connectivity to multiple clouds through a single connection, simplifying multi-cloud architectures.</p>

            <blockquote>
                "Hybrid cloud isn't just about connecting two environments – it's about creating a seamless, high-performance fabric that enables your applications to run anywhere."
            </blockquote>

            <h2>Key Design Considerations</h2>

            <h3>Bandwidth Requirements</h3>
            <p>Calculate your bandwidth needs based on:</p>
            <ul>
                <li>Current data transfer volumes</li>
                <li>Application performance requirements</li>
                <li>Disaster recovery RTO/RPO objectives</li>
                <li>Projected growth over 3-5 years</li>
            </ul>

            <h3>Latency Sensitivity</h3>
            <p>Different applications have different latency requirements:</p>
            <ul>
                <li><strong>Real-time applications:</strong> Require sub-10ms latency</li>
                <li><strong>Database replication:</strong> Typically needs under 50ms</li>
                <li><strong>Backup and archive:</strong> More tolerant, 100ms+ acceptable</li>
            </ul>

            <h3>Redundancy and Resilience</h3>
            <p>A single connection is a single point of failure. Best practices include:</p>
            <ul>
                <li>Dual connections to different points of presence</li>
                <li>Multiple carrier diversity</li>
                <li>Automatic failover mechanisms</li>
                <li>Regular failover testing</li>
            </ul>

            <h2>Physical Infrastructure Requirements</h2>
            <p>Your data center needs the right infrastructure to support cloud connectivity:</p>

            <h3>Cross-Connect to Meet-Me Rooms</h3>
            <p>If your data center is in a carrier hotel or colocation facility, you'll need cross-connects to the cloud provider's equipment or to carrier networks.</p>

            <h3>Demarcation Points</h3>
            <p>Clearly define where your responsibility ends and the provider's begins. Document everything and establish monitoring at these boundaries.</p>

            <h3>Fiber Capacity</h3>
            <p>Ensure you have adequate fiber capacity for current and future connections. Single-mode fiber is essential for longer distances and higher speeds.</p>

            <h2>Security Considerations</h2>
            <p>Hybrid connections require special security attention:</p>
            
            <ul>
                <li>Implement network segmentation between cloud and on-premises</li>
                <li>Use encryption for sensitive traffic even on private connections</li>
                <li>Deploy consistent firewall policies across environments</li>
                <li>Monitor traffic patterns for anomalies</li>
                <li>Maintain compliance with regulatory requirements</li>
            </ul>

            <h2>Monitoring and Management</h2>
            <p>Visibility across hybrid environments is critical:</p>
            
            <ul>
                <li>Implement end-to-end network monitoring</li>
                <li>Track latency, jitter, and packet loss continuously</li>
                <li>Set up alerts for performance degradation</li>
                <li>Use cloud-native and third-party tools together</li>
            </ul>

            <h2>Select Tech Hybrid Solutions</h2>
            <p>We help organizations design and implement hybrid cloud connectivity:</p>
            
            <ul>
                <li>Assessment of current infrastructure and requirements</li>
                <li>Design of optimal connectivity architecture</li>
                <li>Physical infrastructure installation and cabling</li>
                <li>Coordination with cloud providers and carriers</li>
                <li>Ongoing monitoring and support</li>
            </ul>

            <p>Ready to build your hybrid cloud infrastructure? Contact Select Tech for a comprehensive connectivity assessment.</p>
        `
    }
}

const BlogDetail = () => {
    const { slug } = useParams()
    const post = blogPostsData.find(p => p.id === slug)
    const content = blogContent[slug]

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [slug])

    if (!post || !content) {
        return (
            <PageLayout>
                <section className="blog-detail-hero">
                    <div className="blog-detail-container">
                        <h1 className="blog-detail-title">Blog Post Not Found</h1>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '20px' }}>
                            The blog post you're looking for doesn't exist.
                        </p>
                        <Link to="/blog" className="btn-primary" style={{ marginTop: '30px', display: 'inline-block' }}>
                            Back to Blog
                        </Link>
                    </div>
                </section>
            </PageLayout>
        )
    }

    // Get related posts (same category, excluding current)
    const relatedPosts = blogPostsData
        .filter(p => p.id !== slug)
        .slice(0, 3)

    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="blog-detail-hero">
                <div className="blog-detail-container">
                    <Link to="/blog" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        marginBottom: '30px',
                        transition: 'color 0.3s'
                    }}>
                        <ArrowLeft size={18} />
                        Back to Blog
                    </Link>

                    <span className="blog-detail-category">{post.category}</span>
                    <h1 className="blog-detail-title">{post.title}</h1>

                    <div className="blog-detail-meta">
                        <div className="blog-detail-author">
                            <div className="author-avatar">
                                {post.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="author-info">
                                <span className="author-name">{post.author}</span>
                                <span className="author-role">{post.authorRole}</span>
                            </div>
                        </div>
                        <div className="blog-detail-date">
                            <Calendar size={18} />
                            {post.date}
                        </div>
                        <div className="blog-reading-time">
                            <Clock size={18} />
                            {post.readTime}
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="blog-detail-container">
                    <div className="blog-featured-image">
                        <img src={post.image} alt={post.title} />
                    </div>
                </div>
            </section>

            {/* Blog Content */}
            <section className="blog-content-section">
                <div className="blog-content-wrapper">
                    <div
                        className="blog-content"
                        dangerouslySetInnerHTML={{ __html: content.content }}
                    />

                    {/* Tags */}
                    <div className="blog-tags">
                        {post.tags.map((tag, idx) => (
                            <span key={idx} className="blog-tag">#{tag}</span>
                        ))}
                    </div>

                    {/* Share */}
                    <div className="blog-share">
                        <span>Share this article:</span>
                        <div className="share-buttons">
                            <button className="share-btn" title="Share on Twitter">
                                <Twitter size={18} />
                            </button>
                            <button className="share-btn" title="Share on LinkedIn">
                                <Linkedin size={18} />
                            </button>
                            <button className="share-btn" title="Share on Facebook">
                                <Facebook size={18} />
                            </button>
                            <button className="share-btn" title="Copy link">
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            <section className="related-posts-section">
                <div className="related-posts-container">
                    <div className="related-posts-header">
                        <h2>Related Articles</h2>
                    </div>
                    <div className="related-posts-grid">
                        {relatedPosts.map((relatedPost) => (
                            <div key={relatedPost.id} className="blog-listing-card reveal">
                                <Link to={`/blog/${relatedPost.id}`}>
                                    <div className="blog-listing-image">
                                        <img src={relatedPost.image} alt={relatedPost.title} />
                                        <span className="blog-listing-category">{relatedPost.category}</span>
                                    </div>
                                    <div className="blog-listing-content">
                                        <div className="blog-listing-meta">
                                            <span>
                                                <Calendar size={14} />
                                                {relatedPost.date}
                                            </span>
                                        </div>
                                        <h3>{relatedPost.title}</h3>
                                        <p>{relatedPost.excerpt}</p>
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
                    <h2>Ready to Get Started?</h2>
                    <p>Let us help you design and implement the perfect infrastructure solution.</p>
                    <Link to="/contact" className="btn-primary">
                        Contact Us Today
                    </Link>
                </div>
            </section>
        </PageLayout>
    )
}

export default BlogDetail
