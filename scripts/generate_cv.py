#!/usr/bin/env python3
"""Generate professional CV PDFs for Mohammed Boussardi (EN + FR)."""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, black, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, Image, KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Colors ──
DARK = HexColor('#1a1a1a')
GRAY = HexColor('#444444')
LIGHT_GRAY = HexColor('#777777')
RULE_COLOR = HexColor('#cccccc')
ACCENT = HexColor('#2c3e50')

# ── Styles ──
def make_styles():
    base = {
        'fontName': 'Times-Roman',
        'textColor': DARK,
        'leading': 14,
    }
    return {
        'name': ParagraphStyle('Name', fontSize=22, fontName='Times-Bold',
                               textColor=DARK, alignment=TA_LEFT, spaceAfter=2, leading=26),
        'title': ParagraphStyle('Title', fontSize=11, fontName='Times-Roman',
                                textColor=GRAY, alignment=TA_LEFT, spaceAfter=1, leading=14),
        'contact': ParagraphStyle('Contact', fontSize=8.5, fontName='Times-Roman',
                                  textColor=LIGHT_GRAY, alignment=TA_LEFT, leading=12),
        'section_heading': ParagraphStyle('SectionHeading', fontSize=11, fontName='Times-Bold',
                                          textColor=ACCENT, spaceBefore=10, spaceAfter=4,
                                          leading=14, textTransform='uppercase'),
        'body': ParagraphStyle('Body', fontSize=9.5, fontName='Times-Roman',
                               textColor=DARK, alignment=TA_JUSTIFY, leading=13, spaceAfter=2),
        'body_italic': ParagraphStyle('BodyItalic', fontSize=9.5, fontName='Times-Italic',
                                      textColor=GRAY, alignment=TA_JUSTIFY, leading=13),
        'role_title': ParagraphStyle('RoleTitle', fontSize=10, fontName='Times-Bold',
                                     textColor=DARK, leading=13, spaceAfter=1),
        'role_company': ParagraphStyle('RoleCompany', fontSize=9.5, fontName='Times-Italic',
                                       textColor=GRAY, leading=12),
        'role_meta': ParagraphStyle('RoleMeta', fontSize=8.5, fontName='Times-Roman',
                                    textColor=LIGHT_GRAY, leading=11),
        'bullet': ParagraphStyle('Bullet', fontSize=9.5, fontName='Times-Roman',
                                 textColor=DARK, leading=13, leftIndent=8, spaceAfter=1),
        'skill_cat': ParagraphStyle('SkillCat', fontSize=9.5, fontName='Times-Bold',
                                    textColor=DARK, leading=13, spaceAfter=1),
        'skill_items': ParagraphStyle('SkillItems', fontSize=9, fontName='Times-Roman',
                                      textColor=GRAY, leading=12, spaceAfter=3),
        'cert_name': ParagraphStyle('CertName', fontSize=9.5, fontName='Times-Roman',
                                    textColor=DARK, leading=13),
        'small': ParagraphStyle('Small', fontSize=8, fontName='Times-Roman',
                                textColor=LIGHT_GRAY, leading=10),
    }


def section_rule():
    return HRFlowable(width="100%", thickness=0.5, color=RULE_COLOR,
                      spaceBefore=2, spaceAfter=6)


def build_cv(data, output_path, profile_img_path):
    """Build a single CV PDF from the data dict."""
    styles = make_styles()

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        topMargin=18*mm,
        bottomMargin=15*mm,
        leftMargin=20*mm,
        rightMargin=20*mm,
        title=f"CV — {data['name']}",
        author=data['name'],
        subject=data['title'],
    )

    story = []

    # ── Header: photo + name/title/contact ──
    header_parts = []

    # Profile image
    if os.path.exists(profile_img_path):
        img = Image(profile_img_path, width=28*mm, height=28*mm)
        img.hAlign = 'LEFT'
    else:
        img = Spacer(28*mm, 28*mm)

    name_block = [
        Paragraph(data['name'], styles['name']),
        Paragraph(data['title'], styles['title']),
        Spacer(1, 3),
        Paragraph(data['contact_line'], styles['contact']),
    ]

    from reportlab.platypus import KeepInFrame
    # Build as a table: [photo | name block]
    header_table = Table(
        [[img, name_block]],
        colWidths=[32*mm, doc.width - 34*mm],
        rowHeights=[32*mm],
    )
    header_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (0, 0), 0),
        ('LEFTPADDING', (1, 0), (1, 0), 4*mm),
        ('RIGHTPADDING', (-1, -1), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 4*mm))

    # ── Summary ──
    story.append(Paragraph(data['section_labels']['summary'], styles['section_heading']))
    story.append(section_rule())
    story.append(Paragraph(data['summary'], styles['body']))
    story.append(Spacer(1, 2*mm))

    # ── Experience ──
    story.append(Paragraph(data['section_labels']['experience'], styles['section_heading']))
    story.append(section_rule())
    for role in data['experience']:
        role_block = []
        # Title + period on same line via table
        left = Paragraph(f"<b>{role['title']}</b>", styles['role_title'])
        right = Paragraph(role['period'], styles['role_meta'])
        meta_table = Table([[left, right]], colWidths=[doc.width * 0.65, doc.width * 0.35])
        meta_table.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ('TOPPADDING', (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ]))
        role_block.append(meta_table)
        role_block.append(Paragraph(f"{role['company']} — {role['location']}", styles['role_company']))
        role_block.append(Spacer(1, 2))
        role_block.append(Paragraph(role['description'], styles['body']))
        if role.get('tags'):
            tags_str = " | ".join(role['tags'])
            role_block.append(Paragraph(f"<i>{tags_str}</i>", styles['small']))
        role_block.append(Spacer(1, 3*mm))
        story.append(KeepTogether(role_block))

    # ── Skills ──
    story.append(Paragraph(data['section_labels']['skills'], styles['section_heading']))
    story.append(section_rule())
    for cat in data['skills']:
        items_str = ", ".join(cat['items'])
        story.append(Paragraph(f"{cat['title']}", styles['skill_cat']))
        story.append(Paragraph(items_str, styles['skill_items']))
    story.append(Spacer(1, 2*mm))

    # ── Certifications ──
    story.append(Paragraph(data['section_labels']['certifications'], styles['section_heading']))
    story.append(section_rule())
    for cert in data['certifications']:
        story.append(Paragraph(f"{cert['name']} — <i>{cert['issuer']}</i>", styles['cert_name']))
    story.append(Spacer(1, 2*mm))

    # ── Education ──
    story.append(Paragraph(data['section_labels']['education'], styles['section_heading']))
    story.append(section_rule())
    for edu in data['education']:
        edu_block = []
        left = Paragraph(f"<b>{edu['degree']}</b>", styles['role_title'])
        right = Paragraph(edu['period'], styles['role_meta'])
        edu_table = Table([[left, right]], colWidths=[doc.width * 0.7, doc.width * 0.3])
        edu_table.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ('TOPPADDING', (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ]))
        edu_block.append(edu_table)
        school_line = f"{edu['school']} — {edu['location']}"
        if edu.get('status'):
            school_line += f" ({edu['status']})"
        edu_block.append(Paragraph(school_line, styles['role_company']))
        edu_block.append(Spacer(1, 3*mm))
        story.append(KeepTogether(edu_block))

    # ── Languages ──
    story.append(Paragraph(data['section_labels']['languages'], styles['section_heading']))
    story.append(section_rule())
    story.append(Paragraph(", ".join(data['languages']), styles['body']))
    story.append(Spacer(1, 2*mm))

    # ── Links ──
    story.append(Paragraph(data['section_labels']['links'], styles['section_heading']))
    story.append(section_rule())
    for link in data['links']:
        story.append(Paragraph(f'<a href="{link["url"]}" color="#2c3e50">{link["label"]}</a>', styles['body']))

    doc.build(story)
    print(f"Created: {output_path}")


# ══════════════════════════════════════════
# DATA
# ══════════════════════════════════════════

PROFILE_IMG = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'profile.jpg')
OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public')

EN_DATA = {
    'name': 'Mohammed Boussardi',
    'title': 'Enterprise Applications Consultant — Oracle APEX | HRIS & WFM',
    'contact_line': 'mail.mboussardi@gmail.com  |  +212 602 665 248  |  Mohammedia, Morocco  |  linkedin.com/in/mohammed-boussardi  |  mboussardi.ma',
    'section_labels': {
        'summary': 'Professional Summary',
        'experience': 'Professional Experience',
        'skills': 'Technical Skills & Competencies',
        'certifications': 'Certifications',
        'education': 'Education',
        'languages': 'Languages',
        'links': 'Links',
    },
    'summary': (
        'Solutions-driven Enterprise Applications Consultant with 4+ years of experience in Oracle APEX development, '
        'HRIS configuration, and workforce management systems. Currently engaged at Inetum configuring Chronotime in an '
        'offshore context. Proven track record delivering high-compliance projects for institutions including Bank Al-Maghrib. '
        'Combines technical expertise in Oracle ecosystems (APEX, PL/SQL, EBS) with functional awareness and structured '
        'project coordination to deliver reliable outcomes aligned with organizational goals.'
    ),
    'experience': [
        {
            'title': 'HRIS / WFM Consultant — Chronotime',
            'company': 'Inetum',
            'period': 'Jun 2025 — Present',
            'location': 'Offshore — Morocco',
            'description': 'Configuration and setup of Chronotime in an offshore HRIS environment. Working on calculation rules, scheduling models, process alignment, and coordination with functional teams.',
            'tags': ['Chronotime', 'WFM', 'HRIS', 'Configuration', 'Offshore'],
        },
        {
            'title': 'Oracle APEX Consultant',
            'company': 'Popay Maroc',
            'period': 'Aug 2023 — May 2025',
            'location': 'Casablanca, Morocco',
            'description': 'Development of business applications using Oracle APEX for integration and automation missions. Involved in electronic signature, secure workflows, and pension fund-related projects.',
            'tags': ['Oracle APEX', 'PL/SQL', 'E-Signature', 'Workflow', 'Oracle EBS'],
        },
        {
            'title': 'Oracle APEX Consultant (via Popay)',
            'company': 'Mission — Bank Al-Maghrib',
            'period': 'Jul 2024 — May 2025',
            'location': 'Rabat, Morocco',
            'description': 'Contributed to Oracle APEX application development with Oracle E-Business Suite integration for Morocco\'s central bank, in a context demanding high reliability and compliance.',
            'tags': ['Bank Al-Maghrib', 'Oracle APEX', 'Oracle EBS', 'Compliance', 'Integration'],
        },
        {
            'title': 'Online Instructor — IT & Programming',
            'company': 'Classgap',
            'period': 'Sep 2022 — Jul 2023',
            'location': 'Online',
            'description': 'Guided students and professionals in programming, databases, and web technologies. Strengthened pedagogical and technical communication skills.',
            'tags': ['Teaching', 'Programming', 'SQL', 'Python'],
        },
        {
            'title': 'Intern — Development & Systems',
            'company': 'Sonasid',
            'period': 'Apr 2021 — Jul 2021',
            'location': 'Nador, Morocco',
            'description': 'End-of-studies internship focused on internal tool development and understanding industrial information systems.',
            'tags': ['Development', 'Industry', 'Information Systems'],
        },
    ],
    'skills': [
        {'title': 'Core Technologies', 'items': ['Oracle APEX', 'PL/SQL', 'JavaScript', 'Python', 'SQL', 'HTML/CSS', 'TypeScript']},
        {'title': 'Enterprise Systems', 'items': ['Oracle EBS', 'Chronotime', 'HRIS', 'WFM', 'Oracle Databases']},
        {'title': 'Functional Skills', 'items': ['Configuration', 'Calculation Rules', 'Setup', 'Requirements Analysis', 'Functional Documentation']},
        {'title': 'Delivery & Collaboration', 'items': ['Project Coordination', 'Stakeholder Management', 'Agile', 'Documentation', 'User Support']},
        {'title': 'Integration & Tools', 'items': ['REST API', 'Web Services', 'Git', 'CI/CD', 'Jira', 'Oracle SQL Developer']},
    ],
    'certifications': [
        {'name': 'Oracle APEX Developer', 'issuer': 'Oracle'},
        {'name': 'Oracle PL/SQL Developer Certified', 'issuer': 'Oracle'},
        {'name': 'JavaScript Algorithms and Data Structures', 'issuer': 'freeCodeCamp'},
        {'name': 'Python for Data Science', 'issuer': 'IBM'},
    ],
    'education': [
        {
            'degree': 'Engineering Degree in Information Systems and Management',
            'school': 'ISGA School of Engineering',
            'location': 'Morocco',
            'period': '2025 — 2028',
            'status': 'In progress',
        },
        {
            'degree': 'Technical University Degree, System & Network Administration',
            'school': 'Ecole Superieure de Technologie de Safi',
            'location': 'Safi, Morocco',
            'period': '2019 — 2021',
            'status': '',
        },
    ],
    'languages': ['Arabic — Native', 'French — Fluent', 'English — Professional', 'Spanish — Intermediate'],
    'links': [
        {'label': 'Portfolio: mboussardi.ma', 'url': 'https://mboussardi.ma'},
        {'label': 'LinkedIn: linkedin.com/in/mohammed-boussardi', 'url': 'https://linkedin.com/in/mohammed-boussardi'},
    ],
}

FR_DATA = {
    'name': 'Mohammed Boussardi',
    'title': 'Consultant Applications d\'Entreprise — Oracle APEX | SIRH & GTA',
    'contact_line': 'mail.mboussardi@gmail.com  |  +212 602 665 248  |  Mohammedia, Maroc  |  linkedin.com/in/mohammed-boussardi  |  mboussardi.ma',
    'section_labels': {
        'summary': 'Profil',
        'experience': 'Experiences Professionnelles',
        'skills': 'Competences Techniques',
        'certifications': 'Certifications',
        'education': 'Formation',
        'languages': 'Langues',
        'links': 'Liens',
    },
    'summary': (
        'Consultant oriente solutions avec plus de 4 ans d\'experience dans le developpement Oracle APEX, '
        'le parametrage SIRH et les systemes de gestion des temps. Actuellement en mission chez Inetum pour le '
        'parametrage de Chronotime en contexte offshore. Parcours confirme de livraison de projets a haute exigence '
        'de conformite, notamment pour Bank Al-Maghrib. Allie maitrise technique des ecosystemes Oracle (APEX, PL/SQL, EBS), '
        'sensibilite fonctionnelle et aptitude a la coordination pour des livrables fiables et alignes aux enjeux de l\'organisation.'
    ),
    'experience': [
        {
            'title': 'Consultant SIRH / GTA — Chronotime',
            'company': 'Inetum',
            'period': 'Juin 2025 — Present',
            'location': 'Offshore — Maroc',
            'description': 'Parametrage et configuration de Chronotime dans un environnement SIRH offshore. Travail sur les regles de calcul, les modeles horaires, l\'alignement des processus et la coordination avec les equipes fonctionnelles.',
            'tags': ['Chronotime', 'GTA', 'SIRH', 'Parametrage', 'Offshore'],
        },
        {
            'title': 'Consultant Oracle APEX',
            'company': 'Popay Maroc',
            'period': 'Aout 2023 — Mai 2025',
            'location': 'Casablanca, Maroc',
            'description': 'Developpement d\'applications metiers sous Oracle APEX dans le cadre de missions d\'integration et d\'automatisation. Intervention sur des projets lies a la signature electronique, aux workflows securises et aux caisses de retraite.',
            'tags': ['Oracle APEX', 'PL/SQL', 'Signature Electronique', 'Workflow', 'Oracle EBS'],
        },
        {
            'title': 'Consultant Oracle APEX (via Popay)',
            'company': 'Mission — Bank Al-Maghrib',
            'period': 'Juil. 2024 — Mai 2025',
            'location': 'Rabat, Maroc',
            'description': 'Contribution au developpement d\'applications Oracle APEX avec integration Oracle E-Business Suite pour la banque centrale du Maroc, dans un contexte a haute exigence de fiabilite et de conformite.',
            'tags': ['Bank Al-Maghrib', 'Oracle APEX', 'Oracle EBS', 'Conformite', 'Integration'],
        },
        {
            'title': 'Enseignant en ligne — Informatique & Programmation',
            'company': 'Classgap',
            'period': 'Sep. 2022 — Juil. 2023',
            'location': 'En ligne',
            'description': 'Accompagnement d\'etudiants et de professionnels dans l\'apprentissage de la programmation, des bases de donnees et des technologies web.',
            'tags': ['Enseignement', 'Programmation', 'SQL', 'Python'],
        },
        {
            'title': 'Stagiaire — Developpement & Systemes',
            'company': 'Sonasid',
            'period': 'Avr. 2021 — Juil. 2021',
            'location': 'Nador, Maroc',
            'description': 'Stage de fin d\'etudes axe sur le developpement d\'outils internes et la comprehension des systemes industriels d\'information.',
            'tags': ['Developpement', 'Industrie', 'Systemes d\'information'],
        },
    ],
    'skills': [
        {'title': 'Technologies Core', 'items': ['Oracle APEX', 'PL/SQL', 'JavaScript', 'Python', 'SQL', 'HTML/CSS', 'TypeScript']},
        {'title': 'Systemes d\'Entreprise', 'items': ['Oracle EBS', 'Chronotime', 'SIRH', 'GTA', 'Bases de donnees Oracle']},
        {'title': 'Competences Fonctionnelles', 'items': ['Parametrage', 'Regles de calcul', 'Configuration', 'Analyse de besoins', 'Documentation fonctionnelle']},
        {'title': 'Livraison & Collaboration', 'items': ['Coordination projet', 'Gestion des parties prenantes', 'Agile', 'Documentation', 'Support utilisateur']},
        {'title': 'Integration & Outils', 'items': ['REST API', 'Web Services', 'Git', 'CI/CD', 'Jira', 'Oracle SQL Developer']},
    ],
    'certifications': [
        {'name': 'Oracle APEX Developer', 'issuer': 'Oracle'},
        {'name': 'Oracle PL/SQL Developer Certified', 'issuer': 'Oracle'},
        {'name': 'JavaScript Algorithms and Data Structures', 'issuer': 'freeCodeCamp'},
        {'name': 'Python for Data Science', 'issuer': 'IBM'},
    ],
    'education': [
        {
            'degree': 'Diplome d\'Ingenieur en Systemes d\'Information et Management',
            'school': 'ISGA School of Engineering',
            'location': 'Maroc',
            'period': '2025 — 2028',
            'status': 'En cours',
        },
        {
            'degree': 'DUT, Administration des Systemes et Reseaux',
            'school': 'Ecole Superieure de Technologie de Safi',
            'location': 'Safi, Maroc',
            'period': '2019 — 2021',
            'status': '',
        },
    ],
    'languages': ['Arabe — Natif', 'Francais — Courant', 'Anglais — Professionnel', 'Espagnol — Intermediaire'],
    'links': [
        {'label': 'Portfolio : mboussardi.ma', 'url': 'https://mboussardi.ma'},
        {'label': 'LinkedIn : linkedin.com/in/mohammed-boussardi', 'url': 'https://linkedin.com/in/mohammed-boussardi'},
    ],
}


if __name__ == '__main__':
    profile = os.path.abspath(PROFILE_IMG)
    build_cv(EN_DATA, os.path.join(OUT_DIR, 'Mohammed_Boussardi_CV_EN.pdf'), profile)
    build_cv(FR_DATA, os.path.join(OUT_DIR, 'Mohammed_Boussardi_CV_FR.pdf'), profile)
    print("Done — both CVs generated.")
