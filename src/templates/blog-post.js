import * as React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Comments from "../components/comments"

import "katex/dist/katex.min.css"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle} pageTitle={post.frontmatter.title} hideNavbar={true}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className="max-w-prose mb-18">
          <div className="flex flex-row justify-between items-baseline">
            {/* <Link to="/" className="no-tufte-underline text-lg all-small-caps text-right my-4">⇠ Home</Link> */}
            <Link to="/" className="no-tufte-underline my-4" rel="home">
              <button className="text-lg all-small-caps border border-current-text rounded px-2 shadow hover:border-orange hover:text-orange">⇠ home</button>
            </Link>
            <p className="text-lg all-small-caps text-right my-4">{post.frontmatter.date} • {post.timeToRead} min read</p>
          </div>
          <hr className="border-current mb-4 border-1"/>
          <h1 id="pageTitle" className="my-16" itemProp="headline">{post.frontmatter.title}</h1>
        </div>
        <div className="max-w-prose">
          <MDXRenderer 
            remoteImages={post.frontmatter.embeddedImagesRemote} 
            localImages={post.frontmatter.embeddedImagesLocal}
          >
            {post.body}
          </MDXRenderer>
        </div>
        <Comments className="max-w-prose"/>
      </article>
      <nav className="flex flex-row justify-around my-8 max-w-prose">
        {previous && (
          <Link to={previous.fields.slug} className="no-tufte-underline" rel="prev">
            <button className="all-small-caps border border-current-text rounded px-2 shadow hover:border-orange hover:text-orange">⇠ previous</button>
          </Link>
        )}
        <Link to="/" className="no-tufte-underline" rel="home">
          <button className="all-small-caps border border-current-text rounded px-2 shadow hover:border-orange hover:text-orange">home</button>
        </Link>
        {next && (
          <Link to={next.fields.slug} className="no-tufte-underline" rel="next">
            <button className="all-small-caps border border-current-text rounded px-2 shadow hover:border-orange hover:text-orange">next ⇢</button>
          </Link>
        )}
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        embeddedImagesLocal {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
            )
          }
        }
        embeddedImagesRemote {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
            )
          }
        }
      }
      timeToRead
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
