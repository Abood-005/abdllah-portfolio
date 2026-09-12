"""
Builds public/Abdllah_Abbara_Resume.pdf -- one page, US Letter.

The previous CV was a two-page python-docx file run through LibreOffice, set in
Carlito. LibreOffice is not installed here, so this rebuilds it with reportlab in
Calibri, which is metric-compatible with Carlito: same advance widths,
near-identical letterforms, so it reads as the same document rather than a
redesign.

Abdllah's edits, 2026-09-12:
  - "Seeking a Fall 2026" -> "Seeking a Winter 2027"
  - the summary opens "Third-year ...". Arithmetic from the Sep 2024 start date
    against the 2026/27 academic year, not a new claim; the site's About section
    already says the same thing.
  - the two retail roles (Restaurante SUMAQ, Adonis) are cut
  - Projects keeps Barber's Touch only; the other three are cut
  - one page, hard limit

The phone number stays HERE and only here. It is deliberately absent from the
website (see src/content/site.ts): a public page gets scraped, a downloaded PDF
does not.

ONE PAGE IS A HARD CONSTRAINT. The document is laid out at a candidate type
scale and measured; if it overflows the next tighter scale is tried. If none fit
the script raises rather than silently spilling onto a second page. Add content
and you may drop the whole document a size, so check the reported scale.
"""

import os
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import letter

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "public", "Abdllah_Abbara_Resume.pdf")

W, H = letter                  # 612 x 792
ML = MR = 36.0                 # 0.5" side margins, matching the original
MT = 34.0
MB = 34.0
CW = W - ML - MR               # 540pt column

FONT_FILES = {
    "CV-R": r"C:\Windows\Fonts\calibri.ttf",
    "CV-B": r"C:\Windows\Fonts\calibrib.ttf",
    "CV-I": r"C:\Windows\Fonts\calibrii.ttf",
}
for _name, _path in FONT_FILES.items():
    pdfmetrics.registerFont(TTFont(_name, _path))

R, B, I = "CV-R", "CV-B", "CV-I"
RULE = 0.6
EN = u"\u2013"
BULLET = u"\u2022"

NAME = "Abdllah Abbara"
CONTACT = [
    u"Mississauga, ON  |  (437) 777-6953  |  Abdllahabbara@icloud.com",
    u"abdllahabbara.ca  |  linkedin.com/in/abdllah-abbara  |  github.com/Abood-005",
]

SUMMARY = (
    "Third-year Computer Science student at Sheridan College specializing in Cloud "
    "Computing, with "
    "hands-on experience building full-stack web applications, automating workflows with "
    "Python, and managing cloud-hosted infrastructure. Currently operating a freelance web "
    "development business serving small business clients across the GTA. Proficient in "
    "JavaScript, React, Python, SQL, and MongoDB, with foundational knowledge of AWS, Azure, "
    "Linux, and networking. Seeking a Winter 2027 co-op or internship in software "
    "development, cloud engineering, or QA."
)

SKILLS = [
    ("Languages & Frameworks:",
     "JavaScript (ES6+), React, Node.js, Python, HTML5, CSS3, C#, SQL, T-SQL, Bash"),
    ("Databases:",
     "MongoDB, Supabase (PostgreSQL), relational database design (ER diagrams, "
     "normalization to 3NF)"),
    ("Cloud & DevOps:",
     "AWS (fundamentals), Azure (fundamentals), GitHub Actions CI/CD, Git, Linux CLI"),
    ("Web & APIs:",
     "REST APIs, DNS/domain management, SSL certificates, responsive design, hosting "
     "and deployment"),
    ("Tools & Platforms:",
     "VS Code, GitHub, Google Workspace, Microsoft 365, remote access tools, "
     "ticketing systems"),
]

EXPERIENCE = [
    {
        "role": "Executive Developer (Backend)",
        "dates": u"Jul 2026 " + EN + " Present",
        "org": "Ignition Hacks",
        "bullets": [
            "Collaborate with the executive and development teams to plan and build "
            "backend functionality supporting hackathon operations and participant-facing "
            "systems.",
            "Develop and maintain server-side logic, database integrations, and APIs while "
            "troubleshooting issues and validating changes before deployment.",
            "Document technical workflows and coordinate development priorities with team "
            "members in a fast-paced, deadline-driven environment.",
        ],
    },
    {
        "role": "Freelance Web Developer & IT Consultant",
        "dates": u"Jan 2026 " + EN + " Present",
        "org": "SparkWebDigital (sparkwebdigital.ca)  |  Remote",
        "bullets": [
            "Design, develop, and deploy responsive websites for small business clients "
            "using JavaScript, React, HTML, CSS, and Supabase, handling full project "
            "lifecycle from requirements gathering to production deployment.",
            "Built a client booking application with a Supabase backend, Google Maps API "
            "integration, and automated email reminders via the Resend API.",
            "Configured CI/CD pipelines using GitHub Actions to automate testing and "
            "deployment workflows across multiple client projects.",
            "Manage DNS configuration, SSL certificates, hosting environments, and domain "
            "routing for all client sites, troubleshooting connectivity and performance "
            "issues independently.",
            "Write Python scripts to automate data processing, reporting, and repetitive "
            "administrative tasks for clients.",
            "Communicate project updates, technical decisions, and issue resolutions to "
            "non-technical stakeholders in clear, accessible language.",
        ],
    },
]

PROJECTS = [
    {
        "name": u"Barber's Touch " + EN + " Full-Stack Booking App",
        "link": "barberstouch.ca",
        "bullets": [
            "Built a full-stack appointment booking application using React, Node.js, and "
            "Supabase (PostgreSQL) with user authentication, appointment scheduling, and "
            "an admin dashboard.",
            "Integrated Google Maps API for location display and the Resend API for "
            "automated email appointment reminders.",
        ],
    },
]

EDUCATION = {
    "degree": u"Bachelor of Science " + EN + " Computer Science, Cloud Computing",
    "dates": u"Sep 2024 " + EN + " Present",
    "org": "Sheridan College  |  Oakville, ON",
    "coursework": (
        "Relevant Coursework: Cloud Infrastructure, Networking & Communications, Web "
        "Application Development, Database Management, Operating Systems, Cybersecurity "
        "Fundamentals, Linear Algebra, Programming Languages & Compilers"
    ),
}

CERTS = [
    u"MongoDB Aggregation in Python  |  MongoDB  |  Issued Mar 2026",
    u"MongoDB CRUD Operations in Python  |  MongoDB  |  Issued Mar 2026",
    u"Connection to MongoDB in Python  |  MongoDB  |  Issued Mar 2026",
]

LANGUAGES = u"English (Fluent, Native)  |  Arabic (Fluent, Native)"


def wrap(text, font, size, width):
    """Greedy word wrap against real glyph metrics."""
    lines, cur = [], ""
    for word in text.split():
        trial = word if not cur else cur + " " + word
        if pdfmetrics.stringWidth(trial, font, size) <= width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


class Layout:
    """
    Runs the document twice at one scale: draw=False to measure, draw=True to
    emit. Identical code path both times, so the measurement cannot drift from
    what actually gets drawn.
    """

    def __init__(self, c, s, draw):
        self.c, self.s, self.draw = c, s, draw
        self.y = H - MT

    def text(self, x, txt, font, size, lead):
        self.y -= size
        if self.draw:
            self.c.setFont(font, size)
            self.c.drawString(x, self.y, txt)
        self.y -= (lead - size)

    def para(self, txt, font, size, lead, x=ML):
        for ln in wrap(txt, font, size, W - MR - x):
            self.text(x, ln, font, size, lead)

    def gap(self, h):
        self.y -= h

    def heading(self, label):
        s = self.s
        self.gap(s["sec_before"])
        self.y -= s["head"]
        if self.draw:
            self.c.setFont(B, s["head"])
            self.c.drawString(ML, self.y, label)
        self.y -= s["rule_gap"]
        if self.draw:
            self.c.setLineWidth(RULE)
            self.c.line(ML, self.y, W - MR, self.y)
        self.gap(s["sec_after"])

    def bullets(self, items):
        s = self.s
        size, lead = s["body"], s["lead"]
        bw = pdfmetrics.stringWidth(BULLET + "  ", R, size)
        for item in items:
            lines = wrap(item, R, size, CW - bw)
            for n, ln in enumerate(lines):
                self.y -= size
                if self.draw:
                    self.c.setFont(R, size)
                    if n == 0:
                        self.c.drawString(ML, self.y, BULLET)
                    self.c.drawString(ML + bw, self.y, ln)
                self.y -= (lead - size)
            self.gap(s["bullet_gap"])

    def role_line(self, left, right):
        """Bold role on the left, date or link flush right on the same baseline."""
        s = self.s
        size = s["body"]
        self.y -= size
        if self.draw:
            self.c.setFont(B, size)
            self.c.drawString(ML, self.y, left)
            self.c.setFont(R, size)
            self.c.drawRightString(W - MR, self.y, right)
        self.y -= (s["lead"] - size)

    def labelled(self, label, rest):
        """Bold label, first line of body beside it, continuations hang at margin."""
        s = self.s
        size, lead = s["body"], s["lead"]
        lw = pdfmetrics.stringWidth(label + " ", B, size)
        lines = wrap(rest, R, size, CW - lw)
        self.y -= size
        if self.draw:
            self.c.setFont(B, size)
            self.c.drawString(ML, self.y, label)
            self.c.setFont(R, size)
            self.c.drawString(ML + lw, self.y, lines[0] if lines else "")
        self.y -= (lead - size)
        for ln in lines[1:]:
            self.text(ML, ln, R, size, lead)

    def build(self):
        s, c = self.s, self.c

        self.y -= s["name"]
        if self.draw:
            c.setFont(B, s["name"])
            c.drawCentredString(W / 2.0, self.y, NAME)
        self.y -= s["name_after"]
        for ln in CONTACT:
            self.y -= s["contact"]
            if self.draw:
                c.setFont(R, s["contact"])
                c.drawCentredString(W / 2.0, self.y, ln)
            self.y -= (s["contact_lead"] - s["contact"])

        self.heading("PROFESSIONAL SUMMARY")
        self.para(SUMMARY, R, s["body"], s["lead"])

        self.heading("TECHNICAL SKILLS")
        for label, rest in SKILLS:
            self.labelled(label, rest)

        self.heading("EXPERIENCE")
        for n, job in enumerate(EXPERIENCE):
            if n:
                self.gap(s["entry_gap"])
            self.role_line(job["role"], job["dates"])
            self.text(ML, job["org"], I, s["body"], s["lead"])
            self.bullets(job["bullets"])

        self.heading("PROJECTS")
        for n, proj in enumerate(PROJECTS):
            if n:
                self.gap(s["entry_gap"])
            self.role_line(proj["name"], proj["link"])
            self.bullets(proj["bullets"])

        self.heading("EDUCATION")
        self.role_line(EDUCATION["degree"], EDUCATION["dates"])
        self.text(ML, EDUCATION["org"], I, s["body"], s["lead"])
        self.para(EDUCATION["coursework"], R, s["body"], s["lead"])

        self.heading("CERTIFICATIONS")
        for ln in CERTS:
            self.text(ML, ln, R, s["body"], s["lead"])

        self.heading("LANGUAGES")
        self.text(ML, LANGUAGES, R, s["body"], s["lead"])

        return self.y


def scale(body, lead_mult, tight):
    """A candidate type scale. `tight` squeezes only inter-block whitespace."""
    return {
        "name": 15.0,
        "name_after": 4.0 * tight,
        "contact": 9.0,
        "contact_lead": 11.0,
        "head": 11.0,
        "rule_gap": 3.0,
        "sec_before": 8.0 * tight,
        "sec_after": 5.0 * tight,
        "body": body,
        "lead": body * lead_mult,
        "bullet_gap": 1.2 * tight,
        "entry_gap": 4.0 * tight,
        "tight": tight,
    }


CANDIDATES = [
    scale(10.0, 1.18, 1.00),
    scale(10.0, 1.14, 0.90),
    scale(9.7, 1.15, 0.85),
    scale(9.5, 1.14, 0.80),
    scale(9.2, 1.13, 0.75),
    scale(9.0, 1.12, 0.70),
]


def main():
    chosen = None
    for n, s in enumerate(CANDIDATES):
        probe = canvas.Canvas(os.devnull, pagesize=letter)
        end = Layout(probe, s, draw=False).build()
        if end >= MB:
            chosen = (n, s, end)
            break
    if chosen is None:
        raise SystemExit(
            "Will not fit one page at any candidate scale. Cut content rather than "
            "shrinking further; below 9pt a CV stops being readable."
        )

    n, s, end = chosen
    c = canvas.Canvas(OUT, pagesize=letter)
    c.setTitle(u"Abdllah Abbara " + EN + u" Resume")
    c.setAuthor(NAME)
    c.setSubject("Curriculum Vitae")
    c.setCreator("scripts/resume.py")
    Layout(c, s, draw=True).build()
    c.showPage()
    c.save()

    print("candidate %d: body %.1fpt, leading %.1fpt, whitespace x%.2f"
          % (n, s["body"], s["lead"], s["tight"]))
    print("bottom margin left over: %.1fpt" % (end - MB))
    print("wrote %s (%d bytes)"
          % (os.path.normpath(OUT), os.path.getsize(OUT)))


if __name__ == "__main__":
    main()
