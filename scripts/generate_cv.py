#!/usr/bin/env python3
"""Generate professional CV PDFs for Mohammed Boussardi (EN + FR).
Targeted for Oracle HCM / HRIS / Talent Acquisition adjacent roles.
"""

import os
import tempfile
from PIL import Image as PILImage
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, Image, KeepTogether, ListFlowable, ListItem
)

# ── Colors ──
DARK = HexColor('#1a1a1a')
GRAY = HexColor('#444444')
LIGHT_GRAY = HexColor('#666666')
MUTED = HexColor('#888888')
RULE_COLOR = HexColor('#c0c0c0')
ACCENT = HexColor('#2c3e50')


def crop_profile_image(src_path):
    """Crop profile image: face-centered, top 18%, no bottom watermark."""
    img = PILImage.open(src_path)
    w, h = img.size
    # Crop: start at 18% from top, take a square region from the upper portion
    # This centers the face and cuts off any bottom watermark/logo
    crop_top = int(h * 0.08)
    crop_size = int(min(w, h) * 0.55)
    left = (w - crop_size) // 2
    top = crop_top
    right = left + crop_size
    bottom = top + crop_size
    # Ensure we don't exceed image bounds
    if bottom > h:
        bottom = h
        top = bottom - crop_size
    cropped = img.crop((left, top, right, bottom))
    # Resize to a clean square
    cropped = cropped.resize((400, 400), PILImage.LANCZOS)
    tmp = tempfile.NamedTemporaryFile(suffix='.jpg', delete=False)
    cropped.save(tmp.name, 'JPEG', quality=92)
    return tmp.name


def make_styles():
    return {
        'name': ParagraphStyle('Name', fontSize=20, fontName='Times-Bold',
                               textColor=DARK, alignment=TA_LEFT, spaceAfter=2, leading=24),
        'title': ParagraphStyle('Title', fontSize=10, fontName='Times-Roman',
                                textColor=GRAY, alignment=TA_LEFT, spaceAfter=1, leading=13),
        'contact': ParagraphStyle('Contact', fontSize=8.5, fontName='Times-Roman',
                                  textColor=MUTED, alignment=TA_LEFT, leading=12),
        'section_heading': ParagraphStyle('SectionHeading', fontSize=10.5, fontName='Times-Bold',
                                          textColor=ACCENT, spaceBefore=8, spaceAfter=3,
                                          leading=13, textTransform='uppercase'),
        'body': ParagraphStyle('Body', fontSize=9.5, fontName='Times-Roman',
                               textColor=DARK, alignment=TA_JUSTIFY, leading=13, spaceAfter=2),
        'role_title': ParagraphStyle('RoleTitle', fontSize=10, fontName='Times-Bold',
                                     textColor=DARK, leading=13, spaceAfter=0),
        'role_company': ParagraphStyle('RoleCompany', fontSize=9.5, fontName='Times-Italic',
                                       textColor=GRAY, leading=12),
        'role_meta': ParagraphStyle('RoleMeta', fontSize=8.5, fontName='Times-Roman',
                                    textColor=MUTED, leading=11, alignment=2),  # TA_RIGHT
        'bullet_item': ParagraphStyle('BulletItem', fontSize=9, fontName='Times-Roman',
                                      textColor=DARK, leading=12, spaceAfter=1),
        'skill_cat': ParagraphStyle('SkillCat', fontSize=9.5, fontName='Times-Bold',
                                    textColor=DARK, leading=13, spaceAfter=0),
        'skill_items': ParagraphStyle('SkillItems', fontSize=9, fontName='Times-Roman',
                                      textColor=GRAY, leading=12, spaceAfter=4),
        'cert_name': ParagraphStyle('CertName', fontSize=9.5, fontName='Times-Roman',
                                    textColor=DARK, leading=13),
        'tags': ParagraphStyle('Tags', fontSize=7.5, fontName='Times-Italic',
                               textColor=MUTED, leading=10, spaceAfter=0),
    }


def section_rule():
    return HRFlowable(width="100%", thickness=0.5, color=RULE_COLOR,
                      spaceBefore=1, spaceAfter=5)


def build_cv(data, output_path, profile_img_path):
    """Build a single CV PDF."""
    styles = make_styles()
    cropped_img_path = crop_profile_image(profile_img_path)

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        topMargin=16*mm,
        bottomMargin=14*mm,
        leftMargin=18*mm,
        rightMargin=18*mm,
        title=f"CV — {data['name']}",
        author=data['name'],
        subject=data['title'],
    )

    story = []

    # ── Header: photo + name/title/contact ──
    img = Image(cropped_img_path, width=24*mm, height=24*mm)
    img.hAlign = 'LEFT'

    name_block = [
        Paragraph(data['name'], styles['name']),
        Paragraph(data['title'], styles['title']),
        Spacer(1, 2),
        Paragraph(data['contact_line'], styles['contact']),
    ]

    header_table = Table(
        [[img, name_block]],
        colWidths=[28*mm, doc.width - 30*mm],
        rowHeights=[28*mm],
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
    story.append(Spacer(1, 3*mm))

    # ── Summary ──
    story.append(Paragraph(data['section_labels']['summary'], styles['section_heading']))
    story.append(section_rule())
    story.append(Paragraph(data['summary'], styles['body']))
    story.append(Spacer(1, 1*mm))

    # ── Experience ──
    story.append(Paragraph(data['section_labels']['experience'], styles['section_heading']))
    story.append(section_rule())
    for role in data['experience']:
        role_block = []
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

        # Bullet points for impact
        for bullet in role['bullets']:
            role_block.append(Paragraph(f"<bullet>&bull;</bullet>  {bullet}", styles['bullet_item']))

        if role.get('tags'):
            tags_str = " | ".join(role['tags'])
            role_block.append(Spacer(1, 1))
            role_block.append(Paragraph(tags_str, styles['tags']))
        role_block.append(Spacer(1, 2.5*mm))
        story.append(KeepTogether(role_block))

    # ── Skills (restructured for ATS) ──
    story.append(Paragraph(data['section_labels']['skills'], styles['section_heading']))
    story.append(section_rule())
    for cat in data['skills']:
        items_str = ", ".join(cat['items'])
        story.append(Paragraph(cat['title'], styles['skill_cat']))
        story.append(Paragraph(items_str, styles['skill_items']))
    story.append(Spacer(1, 1*mm))

    # ── Certifications ──
    story.append(Paragraph(data['section_labels']['certifications'], styles['section_heading']))
    story.append(section_rule())
    for cert in data['certifications']:
        story.append(Paragraph(f"{cert['name']} — <i>{cert['issuer']}</i>", styles['cert_name']))
    story.append(Spacer(1, 1*mm))

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
        edu_block.append(Spacer(1, 2.5*mm))
        story.append(KeepTogether(edu_block))

    # ── Languages ──
    story.append(Paragraph(data['section_labels']['languages'], styles['section_heading']))
    story.append(section_rule())
    story.append(Paragraph(", ".join(data['languages']), styles['body']))
    story.append(Spacer(1, 1*mm))

    # ── Links ──
    story.append(Paragraph(data['section_labels']['links'], styles['section_heading']))
    story.append(section_rule())
    for link in data['links']:
        story.append(Paragraph(f'<a href="{link["url"]}" color="#2c3e50">{link["label"]}</a>', styles['body']))

    doc.build(story)
    # Clean up temp cropped image
    os.unlink(cropped_img_path)
    print(f"Created: {output_path}")


# ══════════════════════════════════════════════════════════════
# DATA — Repositioned for Oracle HCM / HRIS / Talent Acquisition
# ══════════════════════════════════════════════════════════════

PROFILE_IMG = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'profile.jpg')
OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public')

EN_DATA = {
    'name': 'Mohammed Boussardi',
    'title': 'HRIS Consultant — Oracle Ecosystem | Oracle APEX | Time & Attendance | HR Process Configuration',
    'contact_line': 'mail.mboussardi@gmail.com  |  +212 602 665 248  |  Mohammedia, Morocco  |  linkedin.com/in/mohammed-boussardi  |  mboussardi.ma',
    'section_labels': {
        'summary': 'Professional Summary',
        'experience': 'Professional Experience',
        'skills': 'Core Competencies',
        'certifications': 'Certifications',
        'education': 'Education',
        'languages': 'Languages',
        'links': 'Links',
    },
    'summary': (
        'HRIS and Oracle ecosystem consultant with 4+ years of hands-on experience in HR process configuration, '
        'workforce management (WFM), time and attendance systems, and enterprise application development. '
        'Currently configuring Chronotime at Inetum in an offshore HRIS delivery model. '
        'Proven ability to deliver high-compliance projects for regulated institutions including Bank Al-Maghrib. '
        'Strong functional understanding of HR processes — scheduling, calculation rules, validation workflows — '
        'combined with deep technical expertise in Oracle APEX, PL/SQL, and Oracle EBS. '
        'Adept at stakeholder management, business analysis, requirements gathering, UAT coordination, '
        'and structured delivery in multi-stakeholder environments.'
    ),
    'experience': [
        {
            'title': 'HRIS / WFM Functional Consultant — Chronotime',
            'company': 'Inetum',
            'period': 'Jun 2025 — Present',
            'location': 'Offshore — Morocco',
            'bullets': [
                'Configure and optimize Chronotime (time and attendance / workforce management) for multiple client environments in an offshore HRIS delivery model.',
                'Define and validate calculation rules, scheduling models, and absence management parameters aligned with client HR policies.',
                'Coordinate with functional teams and HR stakeholders to gather requirements, map HR processes, and ensure configuration accuracy.',
                'Produce functional documentation and configuration specifications; support UAT validation cycles.',
                'Ensure process alignment between business requirements and system behavior across workforce management workflows.',
            ],
            'tags': ['Chronotime', 'HRIS', 'WFM', 'Time & Attendance', 'Configuration', 'HR Processes', 'UAT', 'Offshore'],
        },
        {
            'title': 'Oracle APEX Consultant — Enterprise HR & Business Applications',
            'company': 'Popay Maroc',
            'period': 'Aug 2023 — May 2025',
            'location': 'Casablanca, Morocco',
            'bullets': [
                'Developed Oracle APEX business applications supporting HR, payroll, and pension fund management processes.',
                'Designed and implemented electronic signature workflows for secure validation of HR and financial operations.',
                'Integrated Oracle APEX applications with Oracle EBS modules, ensuring data consistency across enterprise systems.',
                'Conducted business analysis, requirements gathering, and process mapping with functional stakeholders.',
                'Performed functional testing and supported end-user acceptance testing (UAT) for delivered solutions.',
            ],
            'tags': ['Oracle APEX', 'PL/SQL', 'Oracle EBS', 'HR Processes', 'Workflow', 'Integration', 'Business Analysis'],
        },
        {
            'title': 'Oracle APEX Consultant (via Popay) — Central Bank Mission',
            'company': 'Bank Al-Maghrib',
            'period': 'Jul 2024 — May 2025',
            'location': 'Rabat, Morocco',
            'bullets': [
                'Delivered Oracle APEX application development for Morocco\'s central bank in a high-compliance, regulated environment.',
                'Integrated applications with Oracle E-Business Suite, ensuring adherence to institutional security and compliance standards.',
                'Collaborated with cross-functional stakeholders to align technical deliverables with business and regulatory requirements.',
            ],
            'tags': ['Bank Al-Maghrib', 'Oracle APEX', 'Oracle EBS', 'Compliance', 'Integration', 'Stakeholder Management'],
        },
        {
            'title': 'Online Instructor — IT & Programming',
            'company': 'Classgap',
            'period': 'Sep 2022 — Jul 2023',
            'location': 'Online',
            'bullets': [
                'Delivered structured training to students and professionals in programming, SQL databases, and web technologies.',
                'Developed pedagogical skills applicable to end-user training, knowledge transfer, and change management.',
            ],
            'tags': ['Training', 'SQL', 'Python', 'Knowledge Transfer'],
        },
        {
            'title': 'Intern — Development & Information Systems',
            'company': 'Sonasid',
            'period': 'Apr 2021 — Jul 2021',
            'location': 'Nador, Morocco',
            'bullets': [
                'Developed internal tools and gained exposure to industrial information systems in a production environment.',
                'Participated in system analysis and process documentation activities.',
            ],
            'tags': ['Development', 'Information Systems', 'Process Documentation'],
        },
    ],
    'skills': [
        {'title': 'HRIS & Enterprise Systems', 'items': [
            'Chronotime', 'HRIS', 'Workforce Management (WFM)', 'Time & Attendance',
            'Oracle EBS', 'HR Process Configuration', 'Scheduling & Absence Management',
        ]},
        {'title': 'Oracle Ecosystem', 'items': [
            'Oracle APEX', 'PL/SQL', 'Oracle EBS Integration', 'Oracle Databases',
            'Oracle SQL Developer', 'REST API', 'Web Services',
        ]},
        {'title': 'Functional & Business Analysis', 'items': [
            'Requirements Gathering', 'Process Mapping', 'Business Analysis',
            'Functional Documentation', 'Configuration & Setup', 'Calculation Rules',
            'UAT Coordination',
        ]},
        {'title': 'Delivery & Collaboration', 'items': [
            'Stakeholder Management', 'Project Coordination', 'Agile Methodology',
            'Change Management', 'End-User Training', 'Jira', 'Git', 'CI/CD',
        ]},
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
    'title': 'Consultant SIRH — Ecosysteme Oracle | Oracle APEX | GTA | Parametrage & Processus RH',
    'contact_line': 'mail.mboussardi@gmail.com  |  +212 602 665 248  |  Mohammedia, Maroc  |  linkedin.com/in/mohammed-boussardi  |  mboussardi.ma',
    'section_labels': {
        'summary': 'Profil',
        'experience': 'Experiences Professionnelles',
        'skills': 'Competences Cles',
        'certifications': 'Certifications',
        'education': 'Formation',
        'languages': 'Langues',
        'links': 'Liens',
    },
    'summary': (
        'Consultant SIRH et ecosysteme Oracle avec plus de 4 ans d\'experience en parametrage de processus RH, '
        'gestion des temps et des activites (GTA), et developpement d\'applications d\'entreprise. '
        'Actuellement en mission chez Inetum pour le parametrage de Chronotime en contexte offshore. '
        'Parcours confirme dans la livraison de projets a haute exigence de conformite, notamment pour Bank Al-Maghrib. '
        'Solide comprehension fonctionnelle des processus RH — planification, regles de calcul, workflows de validation — '
        'combinee a une expertise technique approfondie en Oracle APEX, PL/SQL et Oracle EBS. '
        'Competences avancees en gestion des parties prenantes, analyse fonctionnelle, recueil de besoins, '
        'coordination de recette (UAT) et livraison structuree en environnements multi-parties prenantes.'
    ),
    'experience': [
        {
            'title': 'Consultant Fonctionnel SIRH / GTA — Chronotime',
            'company': 'Inetum',
            'period': 'Juin 2025 — Present',
            'location': 'Offshore — Maroc',
            'bullets': [
                'Parametrage et optimisation de Chronotime (gestion des temps et activites) pour plusieurs environnements clients en mode delivery offshore SIRH.',
                'Definition et validation des regles de calcul, modeles horaires et parametres de gestion des absences alignes sur les politiques RH des clients.',
                'Coordination avec les equipes fonctionnelles et les parties prenantes RH pour le recueil de besoins, la cartographie des processus RH et la validation des configurations.',
                'Production de documentation fonctionnelle et specifications de parametrage ; accompagnement des cycles de recette (UAT).',
                'Alignement entre les exigences metiers et le comportement systeme sur les workflows de gestion des temps.',
            ],
            'tags': ['Chronotime', 'SIRH', 'GTA', 'Parametrage', 'Processus RH', 'UAT', 'Offshore'],
        },
        {
            'title': 'Consultant Oracle APEX — Applications RH & Metiers',
            'company': 'Popay Maroc',
            'period': 'Aout 2023 — Mai 2025',
            'location': 'Casablanca, Maroc',
            'bullets': [
                'Developpement d\'applications Oracle APEX pour les processus RH, paie et gestion des caisses de retraite.',
                'Conception et mise en oeuvre de workflows de signature electronique pour la validation securisee d\'operations RH et financieres.',
                'Integration des applications Oracle APEX avec les modules Oracle EBS, garantissant la coherence des donnees inter-systemes.',
                'Realisation d\'analyses fonctionnelles, recueil de besoins et cartographie de processus avec les parties prenantes metiers.',
                'Tests fonctionnels et accompagnement des tests d\'acceptation utilisateur (UAT) des solutions livrees.',
            ],
            'tags': ['Oracle APEX', 'PL/SQL', 'Oracle EBS', 'Processus RH', 'Workflow', 'Integration', 'Analyse fonctionnelle'],
        },
        {
            'title': 'Consultant Oracle APEX (via Popay) — Mission Banque Centrale',
            'company': 'Bank Al-Maghrib',
            'period': 'Juil. 2024 — Mai 2025',
            'location': 'Rabat, Maroc',
            'bullets': [
                'Developpement d\'applications Oracle APEX pour la banque centrale du Maroc dans un environnement reglemente a haute conformite.',
                'Integration avec Oracle E-Business Suite dans le respect des normes de securite et de conformite institutionnelles.',
                'Collaboration avec des parties prenantes transversales pour aligner les livrables techniques sur les exigences metiers et reglementaires.',
            ],
            'tags': ['Bank Al-Maghrib', 'Oracle APEX', 'Oracle EBS', 'Conformite', 'Integration', 'Parties prenantes'],
        },
        {
            'title': 'Enseignant en ligne — Informatique & Programmation',
            'company': 'Classgap',
            'period': 'Sep. 2022 — Juil. 2023',
            'location': 'En ligne',
            'bullets': [
                'Formation structuree d\'etudiants et de professionnels en programmation, bases de donnees SQL et technologies web.',
                'Developpement de competences pedagogiques applicables a la formation utilisateur et a la conduite du changement.',
            ],
            'tags': ['Formation', 'SQL', 'Python', 'Transfert de connaissances'],
        },
        {
            'title': 'Stagiaire — Developpement & Systemes d\'Information',
            'company': 'Sonasid',
            'period': 'Avr. 2021 — Juil. 2021',
            'location': 'Nador, Maroc',
            'bullets': [
                'Developpement d\'outils internes et decouverte des systemes d\'information industriels en contexte de production.',
                'Participation aux activites d\'analyse systeme et de documentation des processus.',
            ],
            'tags': ['Developpement', 'Systemes d\'information', 'Documentation processus'],
        },
    ],
    'skills': [
        {'title': 'SIRH & Systemes d\'Entreprise', 'items': [
            'Chronotime', 'SIRH', 'Gestion des Temps et Activites (GTA)',
            'Oracle EBS', 'Parametrage Processus RH', 'Planification & Gestion des Absences',
        ]},
        {'title': 'Ecosysteme Oracle', 'items': [
            'Oracle APEX', 'PL/SQL', 'Integration Oracle EBS', 'Bases de donnees Oracle',
            'Oracle SQL Developer', 'REST API', 'Web Services',
        ]},
        {'title': 'Analyse Fonctionnelle & Metier', 'items': [
            'Recueil de besoins', 'Cartographie de processus', 'Analyse fonctionnelle',
            'Documentation fonctionnelle', 'Parametrage & Configuration', 'Regles de calcul',
            'Coordination de recette (UAT)',
        ]},
        {'title': 'Livraison & Collaboration', 'items': [
            'Gestion des parties prenantes', 'Coordination projet', 'Methodologie Agile',
            'Conduite du changement', 'Formation utilisateur', 'Jira', 'Git', 'CI/CD',
        ]},
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
