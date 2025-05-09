import url from "url";

import config from "@/config.json";


export default function ({
    title,
    description,
    lang,
    location,
    publishedAt,
    updatedAt,
    isArticle = false,
    tags = [],
    type = `Article`,
    fbid,
    image,
    imageType,
    imageWidth,
    imageHeight,
    icon,
    useConfig

}: SEOProps, site: Partial<SiteMetadata> = {}) {
    if (useConfig)
        site = { ...config.siteMetadata, ...site };
    else 
        site = { ...site };

    const metadata = site as SiteMetadata;
    const siteTitle = title ? `${title} - ${metadata.title}` : metadata.title;
    const metaDescription = description
        ? description
        : metadata.description;
    const metaImage = image ? `${metadata.siteUrl}${image}` : null;
    const metaImageType = imageType ? `${imageType}`: null;
    const metaImageWidth = imageWidth ? `${imageWidth}`: null;
    const metaImageHeight = imageHeight ? `${imageHeight}`: null;
    const metaFBID = fbid ? `${fbid}` : null;
    const canonical = url.resolve(metadata.siteUrl, location);

    publishedAt && (publishedAt = new Date(publishedAt).toISOString())
    updatedAt && (updatedAt = new Date(updatedAt).toISOString())
    // const {locale} = useI18n()
    // lang = locale.value;


    const ldJson = {
        "@context": "https://schema.org/",
        "@type": type,
        "author": {
            "@type": "Person",
            "name": metadata.author.name
        },
        ...(tags.length > 0 ? { "keywords": tags.join(`, `) } : {}),
        "headline": siteTitle,
        "url": canonical,
        ...(publishedAt ? { "datePublished": publishedAt } : {}),
        ...(updatedAt ? { "dateModified": updatedAt } : {}),
        ...(metaImage ? {
            "image": {
                "@type": "ImageObject",
                "url": metaImage,
                "width": "1000",
                "height": "520"
            }
        } : {}),
        "publisher": {
            "@type": "Organization",
            "name": metadata.title
        },
        "description": metaDescription,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": metadata.siteUrl
        }
    }

    return useHead({
        htmlAttrs: { lang: lang },
        title: siteTitle,
        meta: [
            {
                name: `description`,
                content: metaDescription,
            },
            {
                property: `og:title`,
                content: siteTitle,
            },
            {
                property: `og:type`,
                content: isArticle ? `article` : `website`,
            },
            {
                property: `og:description`,
                content: metaDescription,
            },
            {
                property: `og:url`,
                content: canonical,
            },
            {
                name: `twitter:label1`,
                content: `Written by`,
            },
            {
                name: `twitter:data1`,
                content: metadata.author.name,
            },
            {
                name: `twitter:card`,
                content: `summary`,
            },
            {
                name: `twitter:creator`,
                content: metadata.author.name,
            },
            {
                name: `twitter:title`,
                content: siteTitle,
            },
            {
                name: `twitter:description`,
                content: metaDescription,
            },
            {
                name: `keywords`,
                content: metadata.keywords.concat(tags).join(', '),
            },
            ...(publishedAt ? [{ name: `article:published_time`, content: publishedAt }] : []),
            ...(updatedAt ? [{ name: `article:modified_time`, content: updatedAt }] : []),
            ...(tags.length > 0 ? [...tags.map((tag) => { return { name: "article:tag", content: tag } })] : []),
            ...(tags.length > 0 ? [{ name: `twitter:label2`, content: `Filed under`, }, { name: `twitter:data2`, content: tags[0], }] : []),
            ...(metaImage ? [{ property: `og:image`, content: metaImage, }, 
                { name: `twitter:image`, content: metaImage, }] : []),
            ...(metaImageType ? [{ property: `og:image:type`, content: metaImageType}] : []),
            ...(metaImageWidth ? [{ property: `og:image:width`, content: metaImageWidth}] : [] ),
            ...(metaImageHeight ? [{ property: `og:image:height`, content: metaImageHeight}] : [] ),
            ...(metaFBID ? [{ property: `fb:app_id`, content: metaFBID}] : [] ),
            


        ],
        link: [ { rel: 'icon', type: 'image/ico', href: icon ? icon : '/favicon.ico' } ],
        script: [{
            type: `application/ld+json`,
            children: JSON.stringify(ldJson)
        }], 
    })
}