/* ==========================================================================
   SITE CONFIG — the ONLY file you need to edit to personalise the portfolio.
   Replace every value marked "EDIT" with your own details.
   ========================================================================== */

window.SITE_CONFIG = {
  /* ---------- Identity ---------- */
  name: "Your Name",                          // EDIT: shown in nav, hero, footer
  role: "Video Editor",                       // EDIT
  tagline: "I turn raw footage into stories people remember.", // EDIT
  heroImage: "assets/images/profile.jpg",    // EDIT: your photo (optional – hidden if missing)
  resumeLink: "",                             // EDIT (optional): link to your CV/Drive file. Leave "" to hide button

  /* ---------- About ---------- */
  about: {
    image: "assets/images/about.jpg",         // EDIT: optional photo (hidden if missing)
    paragraphs: [
      "Write a short introduction about yourself here.",                      // EDIT
      "Mention your experience, the kind of content you edit, and your style." // EDIT
    ],
    // Optional highlight numbers. Delete the items (leave []) to hide this row.
    stats: [
      { value: "0+", label: "Years Experience" },    // EDIT
      { value: "0+", label: "Projects Delivered" }   // EDIT
    ]
  },

  /* ---------- Skills ---------- */
  skills: [
    { icon: "Pr", name: "Adobe Premiere Pro", desc: "Cutting, pacing, audio sync and full timeline workflows." },
    { icon: "Ps", name: "Photoshop",          desc: "Thumbnails, graphics and visual assets for every video." },
    { icon: "Ae", name: "After Effects",      desc: "Motion graphics, titles, transitions and visual effects." },
    { icon: "story", name: "Storytelling",    desc: "Shaping footage into a clear, engaging narrative." },
    { icon: "color", name: "Color Grading",   desc: "Consistent, cinematic color that sets the mood." }
  ],

  /* ---------- Projects ----------
     thumb : path to an image inside assets/thumbnails/  (or a full image URL)
     link  : Google Drive share link for that video
     If a thumbnail file is missing, a clean placeholder is shown automatically. */
  longVideos: [
    { title: "Long Video Project 1", thumb: "assets/thumbnails/long-1.jpg", link: "https://drive.google.com/file/d/YOUR_FILE_ID_1/view" }, // EDIT
    { title: "Long Video Project 2", thumb: "assets/thumbnails/long-2.jpg", link: "https://drive.google.com/file/d/YOUR_FILE_ID_2/view" }, // EDIT
    { title: "Long Video Project 3", thumb: "assets/thumbnails/long-3.jpg", link: "https://drive.google.com/file/d/YOUR_FILE_ID_3/view" }  // EDIT
  ],

  shortVideos: [
    { title: "Short Video 1", thumb: "assets/thumbnails/short-1.jpg", link: "https://drive.google.com/file/d/YOUR_FILE_ID_4/view" }, // EDIT
    { title: "Short Video 2", thumb: "assets/thumbnails/short-2.jpg", link: "https://drive.google.com/file/d/YOUR_FILE_ID_5/view" }, // EDIT
    { title: "Short Video 3", thumb: "assets/thumbnails/short-3.jpg", link: "https://drive.google.com/file/d/YOUR_FILE_ID_6/view" }  // EDIT
  ],

  /* ---------- Contact ---------- */
  contact: {
    whatsappNumber: "910000000000",           // EDIT: country code + number, digits only (e.g. 919876543210)
    whatsappMessage: "Hi! I saw your portfolio and would like to talk about a video project.",
    email: "you@example.com",                 // EDIT
    emailSubject: "Video Editing Inquiry",
    emailBody: "Hi,\n\nI'd like to discuss a video editing project.\n\n"
  },

  /* ---------- Social links (shown bottom-right of footer) ---------- */
  social: [
    { type: "instagram", label: "Instagram", url: "https://instagram.com/your_handle" },        // EDIT
    { type: "youtube",   label: "YouTube",   url: "https://youtube.com/@your_channel" }          // EDIT
    // type can be: "instagram", "youtube", "linkedin", "x"
  ]
};
