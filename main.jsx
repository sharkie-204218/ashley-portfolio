import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

// Add verified public URLs here. Leave unavailable links empty.
const projectUrls = {
  inventoryDemo: 'https://smart-inventory-analytics.streamlit.app',
  inventoryGithub: '',
  sentimentDemo: '',
  sentimentGithub: '',
  coordinationDemo: '',
  coordinationGithub: ''
};

const projects = [
  {
    id: '01',
    category: { en: 'OPERATIONS / DATA', zh: '运营 / 数据' },
    title: 'Smart Inventory Analytics',
    problem: {
      en: 'Inventory reconciliation and stock records can be difficult to review when information is spread across spreadsheets.',
      zh: '库存信息分散在不同表格时，库存核对与库存记录的查看和管理会更加困难。'
    },
    why: {
      en: 'Inspired by inventory reconciliation and stock record management during a medical-device manufacturing internship.',
      zh: '灵感来自医疗器械制造企业实习期间接触到的库存核对与库存记录管理工作。'
    },
    solution: {
      en: 'An independently developed portfolio demonstration that turns simulated inventory data into stock summaries, category views, and low-stock signals.',
      zh: '独立开发的作品集演示项目，使用模拟数据展示库存概况、品类分布与低库存提示。'
    },
    technology: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
    demo: projectUrls.inventoryDemo,
    github: projectUrls.inventoryGithub
  },
  {
    id: '02',
    category: { en: 'CUSTOMER INSIGHTS / NLP', zh: '客户洞察 / 自然语言处理' },
    title: 'Customer Sentiment Intelligence',
    problem: {
      en: 'Scattered customer comments make it hard to spot recurring concerns and turn feedback into clear next steps.',
      zh: '零散的客户反馈不易整理，也难以从中发现重复出现的问题并形成明确的后续行动。'
    },
    why: {
      en: 'Motivated by the need to convert scattered customer feedback into actionable business insights.',
      zh: '项目动机是探索如何将零散的客户反馈转化为可执行的商业洞察。'
    },
    solution: {
      en: 'An independently developed portfolio demonstration that explores simulated feedback and summarizes sentiment patterns for business review.',
      zh: '独立开发的作品集演示项目，用模拟反馈分析情绪倾向，并汇总可供业务参考的反馈模式。'
    },
    technology: ['Python', 'Streamlit', 'VADER', 'Pandas'],
    demo: projectUrls.sentimentDemo,
    github: projectUrls.sentimentGithub
  },
  {
    id: '03',
    category: { en: 'PROJECT DELIVERY / OPERATIONS', zh: '项目交付 / 运营' },
    title: 'Enterprise Project Coordination',
    problem: {
      en: 'Order updates, logistics details, documentation, and deadlines can become fragmented across teams.',
      zh: '订单进度、物流信息、业务文档与交付节点容易分散在不同团队和沟通渠道中。'
    },
    why: {
      en: 'Inspired by order follow-up, logistics coordination, documentation, and cross-functional communication in manufacturing operations.',
      zh: '灵感来自制造业运营中的订单跟进、物流协调、文档管理与跨职能沟通。'
    },
    solution: {
      en: 'An independently developed portfolio demonstration that uses simulated project data to visualize task status, timelines, blockers, and delivery risks.',
      zh: '独立开发的作品集演示项目，使用模拟项目数据可视化任务状态、时间线、阻塞事项与交付风险。'
    },
    technology: ['Python', 'Streamlit', 'Plotly', 'Pandas'],
    demo: projectUrls.coordinationDemo,
    github: projectUrls.coordinationGithub
  }
];

const copy = {
  en: {
    nav: { education: 'EDUCATION', projects: 'PROJECTS', about: 'ABOUT', contact: 'CONTACT' },
    eyebrow: 'INTERNATIONAL BUSINESS / DATA / AI',
    portfolio: 'PORTFOLIO — 2026',
    role: 'International Business Graduate Student',
    focus: 'Business Analytics | Supply Chain | AI-Assisted Solutions',
    intro: 'Turning operational questions into thoughtful, practical digital solutions.',
    viewProjects: 'VIEW PROJECTS',
    downloadResume: 'DOWNLOAD RESUME',
    educationNumber: '01 / EDUCATION',
    educationNote: 'ACADEMIC BACKGROUND',
    graduateLabel: 'JOINT GRADUATE TRAINING PROGRAM',
    graduateDegree: 'Graduate studies in International Business',
    graduateFocus: 'Focus: Cross-Border Logistics & Supply Chain Management',
    undergraduateLabel: 'UNDERGRADUATE',
    undergraduateDegree: "Bachelor's Degree — International Business",
    aboutNumber: '02 / ABOUT',
    aboutNote: 'THE PERSON BEHIND THE WORK',
    aboutHeading: <>BUSINESS MINDED.<br /><em>CURIOUS BY NATURE.</em></>,
    aboutOne: 'I’m Ashley (Hongyu Pan), an International Business graduate student interested in how data and digital tools can support better business decisions.',
    aboutTwo: 'My interests span cross-border supply chains, operational workflows, and practical AI-assisted solutions. I build independent portfolio demonstrations to explore these ideas with simulated data.',
    internshipNumber: '03 / EXPERIENCE',
    internshipNote: 'MANUFACTURING OPERATIONS',
    internshipTitle: 'Internship experience',
    internshipDescription: 'Exposure to inventory reconciliation and stock record management in a medical-device manufacturing context, alongside order follow-up, logistics coordination, documentation, and cross-functional communication.',
    skillsNumber: '04 / SKILLS',
    skillsNote: 'TOOLS & AREAS OF INTEREST',
    skillGroups: [
      { title: 'BUSINESS', items: 'International Business · Business Analysis · Customer Insights' },
      { title: 'SUPPLY CHAIN', items: 'Cross-Border Logistics · Inventory · Order Follow-up' },
      { title: 'DATA & TOOLS', items: 'Python · Pandas · Streamlit · Plotly · Excel · AI-Assisted Development' }
    ],
    projectsNumber: '05 / SELECTED PROJECTS',
    projectsNote: 'INDEPENDENT DEMONSTRATIONS · SIMULATED DATA',
    workHeading: <>IDEAS INTO<br /><span className="red">PRACTICE.</span></>,
    problem: 'BUSINESS PROBLEM',
    why: 'WHY I BUILT IT',
    solution: 'SOLUTION',
    technology: 'TECHNOLOGY',
    demo: 'LIVE DEMO',
    github: 'GITHUB REPOSITORY',
    resumeNumber: '06 / RESUME',
    resumeNote: 'BILINGUAL DOWNLOADS',
    resumeHeading: <>EXPERIENCE,<br /><span className="red">ON PAPER.</span></>,
    englishResume: 'DOWNLOAD ENGLISH RESUME',
    chineseResume: 'DOWNLOAD CHINESE RESUME',
    resumeUpload: 'Add the real PDF files to public/resumes/ to enable these downloads.',
    contactNumber: '07 / CONTACT',
    contactNote: 'OPEN TO OPPORTUNITIES',
    contactHeading: <>LET’S BUILD<br /><span>SOMETHING USEFUL.</span></>,
    contactDescription: 'Interested in international business, business analytics, supply chain, and digital operations.',
    emailNote: 'EMAIL / ADD YOUR ADDRESS',
    githubProfile: 'GITHUB PROFILE',
    footer: 'PERSONAL PORTFOLIO',
    backToTop: 'BACK TO TOP ↑',
    language: '中文'
  },
  zh: {
    nav: { education: '教育经历', projects: '项目作品', about: '关于我', contact: '联系' },
    eyebrow: '国际商务 / 数据 / 人工智能',
    portfolio: '个人作品集 — 2026',
    role: '国际商务研究生',
    focus: '商业分析 | 供应链 | AI 辅助解决方案',
    intro: '将运营问题转化为有思考、实用的数字化解决方案。',
    viewProjects: '查看项目',
    downloadResume: '下载简历',
    educationNumber: '01 / 教育经历',
    educationNote: '学术背景',
    graduateLabel: '联合培养研究生项目',
    graduateDegree: '国际商务相关研究生学习',
    graduateFocus: '研究方向：跨境物流与供应链管理',
    undergraduateLabel: '本科教育',
    undergraduateDegree: '本科 · 国际商务',
    aboutNumber: '02 / 关于我',
    aboutNote: '作品背后的我',
    aboutHeading: <>关注商业。<br /><em>保持好奇。</em></>,
    aboutOne: '我是 Ashley（潘鸿宇），国际商务研究生，关注数据与数字化工具如何帮助企业做出更好的商业决策。',
    aboutTwo: '我的兴趣包括跨境供应链、运营流程与实用的 AI 辅助解决方案。我通过独立开发的作品集演示项目，使用模拟数据探索这些方向。',
    internshipNumber: '03 / 实习经历',
    internshipNote: '制造业运营',
    internshipTitle: '制造业运营实习',
    internshipDescription: '在医疗器械制造相关场景中接触库存核对与库存记录管理，并了解订单跟进、物流协调、文档整理和跨职能沟通。',
    skillsNumber: '04 / 技能',
    skillsNote: '工具与关注领域',
    skillGroups: [
      { title: '商业', items: '国际商务 · 商业分析 · 客户洞察' },
      { title: '供应链', items: '跨境物流 · 库存管理 · 订单跟进' },
      { title: '数据与工具', items: 'Python · Pandas · Streamlit · Plotly · Excel · AI 辅助开发' }
    ],
    projectsNumber: '05 / 精选项目',
    projectsNote: '独立演示项目 · 模拟数据',
    workHeading: <>让想法<br /><span className="red">落地实践。</span></>,
    problem: '业务问题',
    why: '项目动机',
    solution: '解决方案',
    technology: '技术工具',
    demo: '在线体验',
    github: '查看代码',
    resumeNumber: '06 / 简历',
    resumeNote: '中英文版本',
    resumeHeading: <>专业经历，<br /><span className="red">一页呈现。</span></>,
    englishResume: '下载英文简历',
    chineseResume: '下载中文简历',
    resumeUpload: '将真实 PDF 文件放入 public/resumes/ 文件夹，即可提供下载。',
    contactNumber: '07 / 联系方式',
    contactNote: '期待交流与合作',
    contactHeading: <>一起创造<br /><span>实用的价值。</span></>,
    contactDescription: '关注国际商务、商业分析、供应链与数字化运营。',
    emailNote: '邮箱 / 请补充你的邮箱地址',
    githubProfile: 'GITHUB 主页',
    footer: '个人作品集',
    backToTop: '返回顶部 ↑',
    language: 'EN'
  }
};

function isConfiguredUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function App() {
  const [language, setLanguage] = useState('en');
  const t = copy[language];
  const isChinese = language === 'zh';

  useEffect(() => {
    document.documentElement.lang = isChinese ? 'zh-CN' : 'en';
  }, [isChinese]);

  return (
    <>
      <header className="site-header wrap">
        <a className="wordmark" href="#top" aria-label="Ashley home">ASHLEY<span className="red">.</span></a>
        <nav aria-label="Main navigation">
          <a href="#education">{t.nav.education}</a>
          <a href="#projects">{t.nav.projects}</a>
          <a href="#about">{t.nav.about}</a>
          <a href="#contact">{t.nav.contact}</a>
          <button className="language-toggle" type="button" onClick={() => setLanguage(isChinese ? 'en' : 'zh')} aria-label={isChinese ? 'Switch language to English' : '切换到中文'}>{t.language}</button>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="eyebrow"><span className="red-dot" />{t.eyebrow}<span>{t.portfolio}</span></div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker">{isChinese ? '你好，我是' : 'HELLO, I’M'}</p>
              <h1 id="hero-title">Ashley<span className="red"> / </span><br className="mobile-break" />Hongyu Pan<span className="red">.</span></h1>
              <p className="hero-role">{t.role}</p>
              <p className="hero-focus">{t.focus}</p>
              <p className="hero-intro">{t.intro}</p>
              <div className="hero-actions">
                <a className="button button-dark" href="#projects">{t.viewProjects}<span aria-hidden="true">↗</span></a>
                <a className="button button-outline" href="#resume">{t.downloadResume}<span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <div className="hero-index" aria-hidden="true"><span>INTERNATIONAL</span><strong>BUSINESS<br />× DATA<br /><i>× DIGITAL</i></strong><span>CHONGQING · CHINA</span><span className="index-mark">A.</span></div>
          </div>
          <div className="hero-bottomline"><span>BUSINESS / OPERATIONS / DIGITAL PRODUCTS</span><span>01 — 07</span></div>
        </section>

        <section id="education" className="education section wrap">
          <div className="section-heading"><span>{t.educationNumber}</span><span>{t.educationNote}</span></div>
          <article className="education-feature">
            <div className="education-date">{isChinese ? '2026.09 — 至今' : '2026.09 — PRESENT'}<span>GRADUATE STUDIES</span></div>
            <div className="education-copy">
              <p className="education-label">{t.graduateLabel}</p>
              <h2>{isChinese ? <>对外经济贸易大学<br /><span className="education-join">×</span> 商务部国际贸易经济合作研究院</> : <>University of International Business and Economics (UIBE)<br /><span className="education-join">&</span><br />Chinese Academy of International Trade and Economic Cooperation (CAITEC)</>}</h2>
              <p className="education-program">{isChinese ? '联合培养研究生项目' : 'Joint Graduate Training Program'}</p>
              <p className="education-detail">{t.graduateDegree}</p>
              <p className="education-focus">{t.graduateFocus}</p>
            </div>
            <span className="education-number" aria-hidden="true">01</span>
          </article>
          <article className="education-undergrad">
            <div className="education-date">{isChinese ? '2022.09 — 2026.06' : '2022.09 — 2026.06'}<span>{t.undergraduateLabel}</span></div>
            <div><h3>{isChinese ? '重庆工商大学' : 'Chongqing Technology and Business University'}</h3><p>{t.undergraduateDegree}</p></div>
            <span className="education-number" aria-hidden="true">02</span>
          </article>
        </section>

        <section id="about" className="about section wrap">
          <div className="section-heading"><span>{t.aboutNumber}</span><span>{t.aboutNote}</span></div>
          <div className="about-grid"><h2>{t.aboutHeading}</h2><div><p>{t.aboutOne}</p><p>{t.aboutTwo}</p></div></div>
        </section>

        <section className="experience section wrap">
          <div className="section-heading"><span>{t.internshipNumber}</span><span>{t.internshipNote}</span></div>
          <div className="experience-card"><span className="experience-index">FIELD NOTES / 01</span><div><h2>{t.internshipTitle}</h2><p>{t.internshipDescription}</p></div><span className="experience-mark" aria-hidden="true">↗</span></div>
        </section>

        <section className="skills section wrap">
          <div className="section-heading"><span>{t.skillsNumber}</span><span>{t.skillsNote}</span></div>
          <div className="skills-grid">{t.skillGroups.map((group, index) => <article className="skill-group" key={group.title}><span>0{index + 1}</span><h3>{group.title}</h3><p>{group.items}</p></article>)}</div>
        </section>

        <section id="projects" className="work section wrap">
          <div className="section-heading"><span>{t.projectsNumber}</span><span>{t.projectsNote}</span></div>
          <h2 className="work-title">{t.workHeading}</h2>
          <div className="projects">{projects.map((project) => {
            const demo = project.demo;
            const github = project.github;
            return <article className="project" key={project.id}>
              <div className="project-meta"><span>{project.id} / 03</span><span>{project.category[language]}</span></div>
              <div className="project-main"><h3>{project.title}</h3></div>
              <div className="project-details">
                <div className="project-facts">
                  <div><h4>{t.problem}</h4><p>{project.problem[language]}</p></div>
                  <div><h4>{t.why}</h4><p>{project.why[language]}</p></div>
                </div>
                <div className="project-facts">
                  <div><h4>{t.solution}</h4><p>{project.solution[language]}</p></div>
                  <div><h4>{t.technology}</h4><div className="tags">{project.technology.map((item) => <span key={item}>{item}</span>)}</div></div>
                  <div className="project-links">
                    {isConfiguredUrl(demo) && <a href={demo} target="_blank" rel="noopener noreferrer">{t.demo}<span aria-hidden="true">↗</span></a>}
                    {isConfiguredUrl(github) && <a href={github} target="_blank" rel="noopener noreferrer">{t.github}<span aria-hidden="true">↗</span></a>}
                  </div>
                </div>
              </div>
            </article>;
          })}</div>
        </section>

        <section id="resume" className="resume section wrap">
          <div className="section-heading"><span>{t.resumeNumber}</span><span>{t.resumeNote}</span></div>
          <div className="resume-grid"><h2>{t.resumeHeading}</h2><div className="resume-downloads">
            <a className="button button-dark" href="/resumes/Hongyu_Pan_EN.pdf" download>{t.englishResume}<span aria-hidden="true">↓</span></a>
            <a className="button button-outline" href="/resumes/Hongyu_Pan_CN.pdf" download>{t.chineseResume}<span aria-hidden="true">↓</span></a>
            <p>{t.resumeUpload}</p>
          </div></div>
        </section>

        <section id="contact" className="contact">
          <div className="wrap">
            <div className="section-heading"><span>{t.contactNumber}</span><span>{t.contactNote}</span></div>
            <h2>{t.contactHeading}</h2>
            <p>{t.contactDescription}</p>
            <div className="contact-links"><a href="https://github.com/sharkie-204218" target="_blank" rel="noopener noreferrer">{t.githubProfile} ↗</a><span>{t.emailNote}</span></div>
          </div>
        </section>
      </main>
      <footer className="footer wrap"><span>© 2026 ASHLEY — {t.footer}</span><a href="#top">{t.backToTop}</a></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
