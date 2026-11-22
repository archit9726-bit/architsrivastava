/* =========================================================
   ARCHIT — content.js
   ---------------------------------------------------------
   ALL the words and media on the project pages live here.
   Each project page is built like a Notion page:

     cover    → the wide image at the top (image or .mp4 video)
       EASIEST: just drop an image into  assets/covers/  named after the
       project's id, e.g.  assets/covers/olive-hotel.jpg  — it's used
       automatically (and wins over the cover: "…" below).
       About = about.jpg, Resume = resume.jpg. (.jpg .jpeg .png .webp)
       Optional cover settings — add any of these next to cover:
         coverPosition: "center 30%"   which part shows when it's cropped
                                       ("center top", "center 70%", "left center"…)
         coverFit: "contain"           show the WHOLE image (no cropping)
         coverHeight: "420px"          taller / shorter cover ("50vh" = half the screen)
         coverBg: "#0e1712"            colour behind the image when using "contain"
     title    → the big heading
     subtitle → optional line under the title
     company, tags, year → the property rows under the title
                (leave year: "" to hide that row)
     blocks   → the page content, top to bottom

   BLOCKS — stack these in any order, like Notion blocks:
     { heading: "Observation" }                 big section heading
     { subheading: "OliveLife" }                smaller heading
     { text: "A paragraph…" }                   paragraph
     { quote: "A line worth quoting" }          quote
     { callout: "Note to the reader", icon: "💡" }
     { image: "assets/images/olive-1.jpg", caption: "…" }
     { video: "assets/videos/reel.mp4", caption: "…" }
     { embed: "https://player.vimeo.com/video/123" }   Vimeo / YouTube / Drive player
     { row: [ { image: "a.jpg" }, { image: "b.jpg" } ] }  side by side
     { list: ["First point", "Second point"] } bullet points
     { lead: "A bold intro line" }              bold lead-in sentence
     { divider: true }                          thin line

   No file yet? Leave the quotes empty ( image: "" ) and a
   placeholder shows. Add  ratio: "16/9"  (or "4/5", "1/1")
   to set the placeholder's shape.

   Rules: keep the quotes, commas and brackets exactly as
   they are. Olive Hotel, Duolingo × LFW, Moral Code, DuoTelugu
   and DuoUltimatum use your real case studies from Notion;
   FNS 2.0, Launch Event and Packaging are still FILLER.
   ========================================================= */

window.SITE = {
  name: "Archit",
  owner: "Archit Kumar",

  /* ------------------------------------------------ ABOUT ME
     From the "About Me" section of your Notion page. */
  about: {
    title: "Hi, I’m Archit Kumar",
    cover: "",          /* optional wide image at the top; same cover settings as projects */
    headline: "Ideator with a penchant of design and advertising, always on the look out for opportunities that can challenge.",
    photo: "assets/images/about/portrait.jpg",
    bio: [
      "I’m an Art Director based in Bengaluru, India, with over seven years of experience in the digital advertising and creative industry. My multidisciplinary approach to design brings together branding, graphic design, motion, UI and AI-driven creativity. I’m particularly interested in exploring how AI and emerging technologies can push the boundaries of visual storytelling, brand identity and creative problem-solving. Working across diverse platforms and mediums has given me the flexibility to think beyond conventional design approaches, experiment with new possibilities and create meaningful, impactful brand experiences. I believe in constantly evolving, challenging the familiar and using the right mix of creativity and technology to bring ideas to life."
    ],
    links: [
      /* icon: "linkedin", "email", "behance", "instagram" or "link" */
      { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/archit-kumar-6a1196135/" },
      { label: "Email",    icon: "email",    url: "mailto:archit9726@gmail.com" },
      { label: "Behance",  icon: "behance",  url: "https://www.behance.net/archit_srivastava" }
    ]
  },

  /* ------------------------------------------------ RESUME
     From your CV (Archit_Kumar_Creative_Leadership_Resume.pdf).
     Your phone number is left out on purpose: this page is public.

     COMPANY LOGOS: save each logo (PNG/SVG, ideally square with a
     transparent or white background) at the path in  logo: "…"
     Until a file is there, the company's initials show instead.

     To offer a download, put a PDF in assets/ and set
       pdf: "assets/Archit_Resume.pdf"
     (use a version without your phone number). */
  resume: {
    title: "Resume",
    cover: "",          /* optional wide image at the top; same cover settings as projects */
    role: "Creative Leadership / Art Direction / Brand Building",
    location: "Bengaluru, India",
    pdf: "",
    profile: "Creative professional with 7+ years of experience at the intersection of advertising, design and brand building. Experienced in leading creative teams, developing brand identities, conceptualising integrated campaigns and translating business objectives into compelling visual experiences. Having worked across agencies and in-house teams, brings a combination of conceptual thinking, strong design craft and an understanding of how creativity drives brand relevance and business impact. Experience spans digital campaigns, brand communication, packaging, product storytelling, performance marketing and physical retail experiences.",
    experience: [
      {
        role: "Manager – Design", company: "Licious", logo: "assets/logos/companies/licious.png",
        dates: "March 2025 – Present", location: "Bengaluru",
        bullets: [
          "Lead creative and design initiatives across brand campaigns, packaging, performance marketing, merchandising, product communication and offline retail experiences.",
          "Drive the creative development of Sizzl, Licious’s ready-to-eat and ready-to-cook brand, across brand identity, visual language, packaging and integrated campaigns.",
          "Develop cohesive creative systems and communication frameworks that translate brand strategy into consistent consumer experiences across digital and physical touchpoints.",
          "Lead campaign development and creative execution across major brand moments, including IPL 2025, translating campaign platforms across digital, app, packaging, retail and performance channels.",
          "Build scalable design systems and launch playbooks for retail expansion, improving consistency across store launches and offline brand experiences.",
          "Collaborate with marketing, product, category and business teams to translate commercial objectives into effective creative solutions."
        ]
      },
      {
        role: "Creative Lead – Art", company: "Digitas India", logo: "assets/logos/companies/digitas.png",
        dates: "August 2022 – February 2025", location: "Bengaluru",
        bullets: [
          "Led creative direction and design development across integrated campaigns, digital experiences and brand communication.",
          "Managed and mentored design teams, overseeing creative quality, execution and delivery.",
          "Partnered with strategy, copy, account management and business development teams to develop campaign concepts and creative pitches.",
          "Translated brand objectives and consumer insights into distinctive visual narratives and campaign platforms.",
          "Balanced creative ambition with brand guidelines, audience needs and business requirements."
        ],
        brands: "Duolingo, Harley-Davidson, DBS Bank, Amazon, Infosys, Myntra and Unacademy"
      },
      {
        role: "Design Lead", company: "Schbang", logo: "assets/logos/companies/schbang.png",
        dates: "April 2021 – July 2022", location: "Bengaluru",
        bullets: [
          "Led the development of creative concepts and visual communication across integrated brand campaigns.",
          "Guided design teams through ideation, visual exploration and final execution.",
          "Collaborated with creative and strategic teams to develop relevant, impactful design solutions for diverse brands."
        ],
        brands: "Amazon (Sellers, Karigar, Newsroom), Infosys and Myntra"
      },
      {
        role: "Senior Graphic Designer", company: "Schbang", logo: "assets/logos/companies/schbang.png",
        dates: "January 2020 – April 2021", location: "Bengaluru",
        bullets: [
          "Established conceptual and visual directions for campaigns and brand communication projects.",
          "Worked closely with senior creative and account teams to develop and execute high-quality creative deliverables."
        ],
        brands: "Unacademy, 7 Rivers, Himatsingka and Sun Pharma"
      },
      {
        role: "Art Director", company: "Epsilon", logo: "assets/logos/companies/epsilon.png",
        dates: "April 2019 – January 2020", location: "Bengaluru",
        bullets: [
          "Collaborated with international teams to develop creative assets aligned with global brand guidelines.",
          "Translated briefs into effective visual communication while maintaining quality and consistency across deliverables."
        ],
        brands: "Pernod Ricard, Purina, Amica and Family Dollar"
      }
    ],
    expertise: ["Creative Direction", "Art Direction", "Brand Building", "Integrated Campaigns", "Brand Identity", "Visual Storytelling", "Team Leadership", "Creative Conceptualisation", "Packaging Design", "Retail Experiences", "Digital Communication", "Performance Creative"],
    education: [
      { school: "MICA, Ahmedabad", course: "Post Graduate Programme – Crafting Creative Communication (CCC)", dates: "2018 – 2019" },
      { school: "VIPS, GGSIPU, New Delhi", course: "Bachelor’s Degree – Journalism and Mass Communication", dates: "2015 – 2018" }
    ],
    awards: ["Young Maverick – ABBYs", "Kyoorius Blue Elephant", "DMA Asia Echo Awards", "The Mommys", "SAMMIES – Social Samosa", "DIGIXX Real Achievers"]
  },

  items: [
    /* ---------------------------------------------- 01 */
    {
      id: "duotelugu",
      title: "Duolingo Telugu Launch",
      object: "Duo plush",
      subtitle: "From star to a global star",
      company: "Duolingo India",
      tags: ["Brand Design", "Illustration", "Advertising", "Outdoor", "Social Media"],
      year: "",
      cover: "assets/images/duotelugu/cover.jpg",
      coverFit: "contain",          /* show the whole cover (try removing this line to compare) */
      coverBg: "#0d1512",
      blocks: [
        { heading: "Challenge" },
        { text: "While duolingo wanted to launch their Telugu to English course in Andhra Pradesh – Telangana, insisting on learning English over their mother tongue could be perceived as condescending. How could we launch the course without pinching local nerves?" },
        { heading: "Insight" },
        { text: "In Andhra Pradesh – Telangana, movies are big, but movie stars are bigger." },
        { text: "And thanks to recent global critical successes of films like RRR, they are now considered inspirational global icons. We used this admiration to inspire people to use Duolingo and emulate their journey." },
        { heading: "Execution" },
        { text: "We packaged the launch of the course like the launch of a blockbuster starring our own mascot, Duo. Here's how we brought it to life:" },
        { text: "Emulating Tollywood's grandeur, we installed a 60-foot hand-painted cutout of the Duolingo mascot in central Hyderabad, announcing the new course. Next with popular Telugu rapper Roll-Rida we created a catchy rap about learning English on Duolingo, capturing the local youth's attention." },
        { text: "A series of social-first content, showcased Duo's adventures across Hyderabad, and culminated in an Instagram Live event with top influencers from Andhra Pradesh – Telangana." },
        { embed: "https://player.vimeo.com/video/857884754?title=0&byline=0&portrait=0", ratio: "16/9" },
        { image: "assets/images/duotelugu/01.jpg", alt: "Telugu launch idea board" }
      ]
    },

    /* ---------------------------------------------- 02 */
    {
      id: "momos",
      title: "TheMotherOfAllMomos",
      object: "Momo sticker",
      subtitle: "The Mother of All Momos",
      company: "Licious",
      tags: ["Brand Design", "Illustration", "Advertising", "Outdoor", "Social Media"],
      year: "",
      cover: "assets/images/momos/cover.jpg",
      blocks: [
        { heading: "Opportunity" },
        { text: "Momos have a special place in India's food culture. From street-side stalls to late-night cravings, they've become one of the country's most loved comfort foods." },
        { text: "For Licious, the opportunity was to enter this much-loved category with a product range that could stand apart. But rather than approaching it as just another product launch, I wanted to give the introduction a bigger personality." },
        { text: "Something people would remember." },
        { embed: "https://www.youtube.com/embed/aP35zA5xZCI", ratio: "16/9" },
        { heading: "The Big Idea" },
        { text: "The Mother of All Momos." },
        { text: "Mom is the biggest and best of all. It's an expression that everyone understands, a familiar way of describing something that stands above everything else. We saw an opportunity to bring that thought into the world of momos." },
        { text: "A simple play on words became the foundation for the entire launch turning the idea of being the biggest and best into a bold campaign identity." },
        { text: "The ambition wasn't just to introduce another momo range. It was to make Licious's entry into the category feel like an event of its own." },
        { heading: "Building the identity" },
        { text: "A big idea needed a visual identity that could live up to its name." },
        { text: "We translated the campaign thought into a distinctive visual direction and developed the complete packaging system across all four momo variants. Each pack needed to work as an individual product while belonging to one recognisable family." },
        { text: "The challenge was to balance product appetite, variant differentiation and a distinctive brand presence — creating packaging that could grab attention and make the range instantly identifiable." },
        { text: "From the overarching visual language to the individual variant executions, the packaging was designed as an integral part of the campaign experience." },
        { image: "assets/images/momos/01.jpg" },
        { row: [{ image: "assets/images/momos/02.jpg" }, { image: "assets/images/momos/03.jpg" }] },
        { video: "assets/videos/momos-01.mp4" },
        { image: "assets/images/momos/04.jpg" },
        { row: [{ embed: "https://www.instagram.com/reel/DU5h65igbi6/embed", ratio: "9/16" }, { embed: "https://www.instagram.com/reel/DS41EApklHk/embed", ratio: "9/16" }] },
        { heading: "The Impact" },
        { lead: "The campaign helped turn Licious's entry into the momo category into a significant brand and business moment." },
        { text: "18.54M — Campaign reach." },
        { text: "5.2× — Reported growth in Mumbai." },
        { text: "3.5× — Reported growth in Bengaluru." },
        { text: "210% — Increase in Delhi-NCR daily active users." },
        { text: "The work also received recognition at the e4m D2C Awards 2026 for Best Brand Identity/Packaging." }
      ]
    },

    /* ---------------------------------------------- 03 */
    {
      id: "launch-event",
      title: "Sizzl Launch",
      object: "Ticket & flame",
      company: "Licious",
      tags: ["Tag one", "Tag two"],
      year: "Year",
      cover: "",
      blocks: [
        { heading: "Observation" },
        { text: "Filler text. What did you notice? Set up the problem or the opportunity in two or three sentences." },
        { heading: "Idea" },
        { text: "Filler text. What was the idea, and why did it fit?" },
        { heading: "Execution" },
        { text: "Filler text. How did it come to life, and where did it run?" },
        { divider: true },
        { video: "", ratio: "16/9", caption: "Video caption" },
        { image: "", ratio: "16/9", caption: "Image caption" }
      ]
    },

    /* ---------------------------------------------- 04 */
    {
      id: "packaging",
      title: "Sizzl Packaging",
      object: "Sizzl pack",
      subtitle: "Building a brand experience, from app to packaging.",
      company: "Licious",
      tags: ["Tag one", "Tag two"],
      year: "",
      cover: "",
      blocks: [
        { heading: "Opportunity" },
        { text: "Creating a distinct identity for a new food brand." },
        { text: "With Sizzl, we were building more than a new product range. We were creating a distinct brand within the Licious ecosystem, focused on ready-to-eat and ready-to-cook food." },
        { text: "Our challenge was to give Sizzl its own personality and make that experience recognisable across every consumer touchpoint — starting with the app and extending to packaging." },
        { heading: "Idea" },
        { text: "One brand. One visual language. Multiple touchpoints." },
        { text: "We wanted Sizzl to feel bold, energetic and instantly recognisable." },
        { text: "We built a visual language that gave the brand its own character, while making sure the experience felt connected across the app, product discovery and physical packaging." },
        { text: "The idea was to make every interaction feel unmistakably Sizzl." },
        { heading: "Execution" },
        { text: "Building a system that works across products." },
        { text: "We developed the packaging language with scalability and consistency in mind." },
        { text: "Our process involved:" },
        { list: ["Establishing a distinctive visual hierarchy and colour system.", "Creating recognisable graphic elements and brand assets.", "Balancing appetising product imagery with bold brand communication.", "Adapting the design language across different product formats.", "Extending the packaging experience across channel partners like Swiggy, Zepto and Blinkit."] },
        { text: "The focus was to make every pack feel distinctly Sizzl while allowing individual products to retain their identity." }
      ]
    },

    /* ---------------------------------------------- 05 */
    {
      id: "mancode",
      title: "MoralCode Shoot",
      object: "Sneaker sticker",
      subtitle: "MoralCode Shoot",
      company: "Moral code | Language Shoes",
      tags: ["Art direction", "Styling", "Video Production", "Photography"],
      year: "",
      cover: "assets/images/mancode/cover.jpg",
      blocks: [
        { heading: "Moral Code | Language Formal shoes" },
        { row: [{ image: "assets/images/mancode/01.jpg" }, { image: "assets/images/mancode/02.jpg" }] },
        { row: [{ image: "assets/images/mancode/03.jpg" }, { image: "assets/images/mancode/04.jpg" }] },
        { row: [{ image: "assets/images/mancode/05.jpg" }, { image: "assets/images/mancode/06.jpg" }] },
        { row: [{ video: "assets/videos/mancode-01.mp4" }, { video: "assets/videos/mancode-02.mp4" }] },
        { image: "assets/images/mancode/07.jpg" }
      ]
    },

    /* ---------------------------------------------- 06 */
    {
      id: "duolingo-lfw",
      title: "DuolingoXLakmeFashionWeek",
      object: "Backstage pass",
      subtitle: "The first mascot in the world to ever debut at a high-end fashion show",
      company: "Duolingo India",
      tags: ["Brand Design", "Illustration", "Advertising", "Social Media"],
      year: "",
      cover: "assets/images/duolingo-lfw/cover.jpg",
      blocks: [
        { heading: "Observation" },
        { text: "Lakme Fashion Week is India's premiere fashion show that garners 100 Mn+ impressions over the internet every year. Gen-Z outshines other generations in using fashion for self-expression. So, when the much awaited fashion week is on, Gen-Z is online consuming fashion content instead of doing their lessons." },
        { heading: "Idea" },
        { text: "Duo makes his debut at India's premiere fashion week to surprise the audience with an unexpected presence at the event." },
        { text: "With Duo's debut at Lakme Fashion Week and Duo- core (Duo's own fashion style) establishing a new trend, we wanted to motivate users to never stop learning how to express themselves in new ways with the help of Duolingo." },
        { heading: "Execution" },
        { text: "Duo's presence at Lakme Fashion Week was nothing short of iconic. We created Instagram reels that showcased the charming mascot donning outfits inspired by pop culture icons like Kim Kardashian's Met Gala look and Taylor Swift's \"Look what you made do\" ensembles. Each attire reflected Duo's vibrant personality and emphasized its mission to encourage continuous learning." },
        { text: "Duo interacted with fellow creators, models, and attendees throughout the event leading to a lot of user generated content. It even managed to photobomb, spreading excitement and leaving a lasting impression on everyone present." },
        { text: "Duo's presence added a unique dimension to Lakme Fashion Week, captivating audiences and leaving a lasting impression on all who witnessed his debut as a fashion creator." },
        { divider: true },
        { quote: "The first mascot in the world to ever debut at a high-end fashion show" },
        { image: "assets/images/duolingo-lfw/01.jpg", alt: "Duocore award board" },
        { divider: true },
        { embed: "https://player.vimeo.com/video/1011075305?title=0&byline=0&portrait=0", ratio: "16/9" }
      ]
    },

    /* ---------------------------------------------- 07 */
    {
      id: "fns",
      title: "Licious FNS2.0",
      object: "Fish sticker",
      company: "Licious",
      tags: ["Brand Design", "Illustration", "Advertising", "Outdoor", "Social Media"],
      year: "",
      cover: "assets/images/fns/cover.jpg",
      blocks: [
        { heading: "Opportunity" },
        { text: "Making seafood shopping more visual and intuitive." },
        { text: "Buying fish offline is an experience built around seeing, selecting and customising. Replicating that confidence online meant making seafood variety, freshness, size and cuts easier to understand. The opportunity was to translate the familiar fish-market experience into a visual journey within the Licious app." },
        { heading: "The Big Idea" },
        { text: "From boats to ice beds to the chopping block." },
        { text: "I approached the experience through three visual moments inspired by a traditional fish market:" },
        { list: ["Boats: Showcasing the variety of seafood.", "Ice Beds: Communicating freshness through product presentation.", "Chopping Block: Bringing different fish cuts to life."] },
        { text: "A simple visual narrative that connected discovery with product understanding." },
        { image: "assets/images/fns/01.jpg" },
        { heading: "Building The Identity" },
        { text: "Building a visual language that works at scale." },
        { text: "I explored multiple visual directions across category landing pages, product listing pages and product detail pages." },
        { text: "The process involved experimenting with compositions, camera angles, ice-bed treatments, product arrangements and chopping-board visualisations." },
        { text: "The focus was to create a consistent visual system while retaining the unique characteristics of each raw material." },
        { row: [{ video: "assets/videos/fns-01.mp4" }, { video: "assets/videos/fns-02.mp4" }] },
        { image: "assets/images/fns/02.jpg" },
        { image: "assets/images/fns/03.jpg" },
        { heading: "The Impact" },
        { lead: "A complete visual ecosystem for seafood." },
        { text: "The project translated the visual direction into a large-scale asset ecosystem across the app." },
        { list: ["52 Raw materials", "1,600 Deliverables", "97 Chopping videos", "3,000+ Images generated"] },
        { text: "The resulting experience made seafood discovery more visual, bringing variety, freshness and cut selection together in one cohesive journey." },
        { text: "Reported product outcomes (new users / F0):" },
        { list: ["+8% Add-to-cart rate", "+5% Purchase conversion", "−12% Weight-related queries"] }
      ]
    },

    /* ---------------------------------------------- 08 */
    {
      id: "olive-hotel",
      title: "Olive Branding",
      object: "Room key",
      subtitle: "Olive Rebranding",
      company: "Olive - Embassy Hotels",
      tags: ["Brand Design", "Illustration", "Advertising", "Outdoor", "Social Media"],
      year: "",
      cover: "assets/images/olive-hotel/cover.jpg",
      blocks: [
        { heading: "The Olive Hotel" },
        { video: "assets/videos/olive-hotel-01.mp4" },
        { image: "assets/images/olive-hotel/01.jpg" },
        { image: "assets/images/olive-hotel/02.jpg" },
        { image: "assets/images/olive-hotel/03.jpg" },
        { heading: "OliveLife" },
        { image: "assets/images/olive-hotel/04.jpg" },
        { image: "assets/images/olive-hotel/05.jpg" },
        { image: "assets/images/olive-hotel/06.jpg" },
        { heading: "OliveZip" },
        { image: "assets/images/olive-hotel/07.jpg" },
        { image: "assets/images/olive-hotel/08.jpg" },
        { image: "assets/images/olive-hotel/09.jpg" },
        { heading: "OliveVilla" },
        { image: "assets/images/olive-hotel/10.jpg" },
        { image: "assets/images/olive-hotel/11.jpg" }
      ]
    },

    /* ---------------------------------------------- 09 */
    {
      id: "duoultimatum",
      title: "The Ultimate Reminder",
      object: "Final notice",
      subtitle: "The Duo Ultimatum",
      company: "Duolingo India",
      tags: ["Brand Design", "Advertising", "Illustration", "Social Media"],
      year: "",
      cover: "assets/images/duoultimatum/cover.jpg",
      blocks: [
        { embed: "https://drive.google.com/file/d/1HlxFMuZ5CEz1-xdg2jqN7kIP9GabFAhX/preview", ratio: "16/9" }
      ]
    }
  ]
};
