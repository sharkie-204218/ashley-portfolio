import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

// Add verified public URLs here. Leave unavailable links empty.
const projectUrls = {
  inventoryDemo: 'https://smart-inventory-analytics.streamlit.app',
  inventoryGithub: '',
  sentimentDemo: 'https://customer-sentiment-intelligence.streamlit.app/',
  sentimentGithub: '',
  coordinationDemo: 'https://enterprise-project-coordination.streamlit.app/',
  coordinationGithub: ''
};

const CONTACT_EMAIL = '1192335104@qq.com';

const projects = [
  {
    id: '01',
    category: { en: 'OPERATIONS / DATA', zh: '运营 / 数据' },
    title: { en: 'Smart Inventory Analytics', zh: '智能库存分析' },
    problem: {
      en: 'When stock information is spread across spreadsheets, it’s harder to see what’s available and what needs attention.',
      zh: '库存数据散落在多个表格里时，想快速看清现有库存和需要留意的品类并不容易。'
    },
    why: {
      en: 'During an internship in medical-device manufacturing, I got to know inventory checks and stock records. I wanted to explore a clearer way to review them.',
      zh: '实习期间接触过库存核对和库存记录管理，我想试着把这些信息整理得更直观一些。'
    },
    solution: {
      en: 'A demo built with simulated data, bringing stock summaries, category views, and low-stock flags into one place.',
      zh: '用模拟数据制作的库存分析演示，集中展示库存概况、品类分布和低库存提醒。'
    },
    technology: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
    demo: projectUrls.inventoryDemo,
    github: projectUrls.inventoryGithub
  },
  {
    id: '02',
    category: { en: 'CUSTOMER FEEDBACK / NLP', zh: '客户反馈 / 自然语言处理' },
    title: { en: 'Customer Sentiment Intelligence', zh: '客户反馈情绪智能分析' },
    problem: {
      en: 'Customer comments are often scattered. It takes time to spot the concerns that keep coming up.',
      zh: '客户意见往往散落在不同评论里，重复出现的问题不容易一眼看出来。'
    },
    why: {
      en: 'I wanted to see whether a simple sentiment analysis could help make the overall tone of feedback easier to review.',
      zh: '我想试试情绪分析能否帮助快速梳理反馈的大致倾向。'
    },
    solution: {
      en: 'A demo that analyzes simulated comments and summarizes sentiment patterns for a quick first look.',
      zh: '用模拟评论制作的演示，按情绪倾向整理反馈，方便初步浏览。'
    },
    technology: ['Python', 'Streamlit', 'VADER', 'Pandas'],
    demo: projectUrls.sentimentDemo,
    github: projectUrls.sentimentGithub
  },
  {
    id: '03',
    category: { en: 'PROJECT COORDINATION / OPERATIONS', zh: '项目协同 / 运营' },
    title: { en: 'Enterprise Project Coordination', zh: '企业项目协同与交付' },
    problem: {
      en: 'When order updates, logistics, documents, and deadlines live in different places, it’s easy to lose track of what needs attention.',
      zh: '订单进度、物流信息、文档和截止时间分散在不同地方时，容易顾此失彼。'
    },
    why: {
      en: 'I built this demo to explore whether a single project view could make progress and follow-up easier to track.',
      zh: '我想做一个项目概览页面，看看能不能让进度跟进和团队协作更清楚。'
    },
    solution: {
      en: 'A demo using simulated project data to bring task status, timelines, blockers, and delivery risks into one view.',
      zh: '用模拟项目数据制作的演示，把任务进度、时间安排、待解决事项和交付风险放在同一视图中。'
    },
    technology: ['Python', 'Streamlit', 'Plotly', 'Pandas'],
    demo: projectUrls.coordinationDemo,
    github: projectUrls.coordinationGithub
  }
];

const copy = {
  en: {
    nav: { education: 'EDUCATION', projects: 'PROJECTS', about: 'ABOUT', contact: 'CONTACT' },
    eyebrow: 'INTERNATIONAL BUSINESS / DATA / DIGITAL',
    portfolio: 'PORTFOLIO — 2026',
    role: 'Graduate Student in International Business',
    focus: 'Business Analysis | Supply Chains | Digital Tools',
    intro: 'I started with business problems. Then I got curious about what data and technology could do about them.',
    viewProjects: 'VIEW PROJECTS',
    downloadResume: 'DOWNLOAD RESUME',
    educationNumber: '01 / EDUCATION',
    educationNote: 'EDUCATION',
    graduateLabel: 'GRADUATE EDUCATION',
    graduateDegree: 'Master of International Business · Joint Program',
    graduateFocus: 'Focus: Cross-Border Logistics & Supply Chain Management',
    undergraduateLabel: 'UNDERGRADUATE',
    undergraduateDegree: "Bachelor's Degree — International Business",
    aboutNumber: '02 / ABOUT',
    aboutNote: 'A LITTLE ABOUT ME',
    aboutHeading: <>I START WITH<br /><em>THE PROBLEM.</em></>,
    aboutOne: 'I’m Hongyu Pan; I also go by Ashley in English. I started with business problems, then got curious about what data and technology could do about them. I’m now studying International Business and exploring those questions through independent projects.',
    aboutTwo: 'I’m especially interested in cross-border supply chains and the everyday work behind them: inventory, logistics, and coordination.',
    internshipNumber: '03 / EXPERIENCE',
    internshipNote: 'MANUFACTURING OPERATIONS',
    internshipTitle: 'Medical-device manufacturing internship',
    internshipDescription: 'I was introduced to inventory reconciliation and stock records, as well as order follow-up, logistics coordination, documentation, and communication across teams.',
    skillsNumber: '04 / SKILLS',
    skillsNote: 'TOOLS & AREAS OF INTEREST',
    skillGroups: [
      { title: 'BUSINESS', items: 'International Business · Business Analysis · Customer Insights' },
      { title: 'SUPPLY CHAIN', items: 'Cross-Border Logistics · Inventory · Order Follow-up' },
      { title: 'DATA & TOOLS', items: 'Python · Pandas · Streamlit · Plotly · Excel · AI Tools' }
    ],
    projectsNumber: '05 / SELECTED PROJECTS',
    projectsNote: 'INDEPENDENT PROJECTS · SIMULATED DATA',
    workHeading: <>FROM QUESTION<br />TO <span className="red">DEMO.</span></>,
    problem: 'THE PROBLEM',
    why: 'WHY THIS PROJECT',
    solution: 'WHAT IT DOES',
    technology: 'TOOLS',
    demo: 'View Live Demo',
    github: 'GITHUB REPOSITORY',
    resumeNumber: '06 / RESUME',
    resumeNote: 'BILINGUAL DOWNLOADS',
    resumeHeading: <>MY<br /><span className="red">RESUME.</span></>,
    englishResume: 'DOWNLOAD ENGLISH RESUME',
    chineseResume: 'DOWNLOAD CHINESE RESUME',
    contactNumber: '07 / CONTACT',
    contactNote: 'HAPPY TO CONNECT',
    contactHeading: "LET'S CONNECT / 联系我",
    contactDescription: 'I’m happy to connect about international business, analytics, supply chains, or digital operations.',
    emailMe: 'EMAIL ME',
    copyEmail: 'COPY EMAIL',
    emailCopied: 'Email copied!',
    emailCopyError: 'Could not copy email.',
    footerEmail: 'EMAIL',
    githubProfile: 'GITHUB PROFILE',
    footer: 'PERSONAL PORTFOLIO',
    backToTop: 'BACK TO TOP ↑',
    language: '中文'
  },
  zh: {
    nav: { education: '教育经历', projects: '项目作品', about: '关于我', contact: '联系我' },
    eyebrow: '国际商务 / 数据 / 人工智能',
    portfolio: '个人作品集 — 2026',
    role: '国际商务研究生',
    focus: '商业分析 | 供应链 | AI 辅助解决方案',
    intro: '将运营问题转化为有思考、实用的数字化解决方案。',
    viewProjects: '查看项目',
    downloadResume: '下载简历',
    educationNumber: '01 / 教育经历',
    educationNote: '学术背景',
    graduateLabel: '研究生教育',
    graduateDegree: '国际商务硕士 · 联合培养',
    graduateFocus: '研究方向：跨境物流与供应链管理',
    undergraduateLabel: '本科教育',
    undergraduateDegree: '本科 · 国际商务',
    aboutNumber: '02 / 关于我',
    aboutNote: '简单介绍',
    aboutHeading: <>从具体问题出发。<br /><em>再多想一步。</em></>,
    aboutOne: '我是潘虹宇，英文名 Ashley。我最初接触的是具体的业务问题，后来开始好奇，数据和技术能不能让这些事情变得更简单。现在我在读国际商务，也通过独立项目继续琢磨这些问题。',
    aboutTwo: '我尤其关注跨境供应链，以及库存、物流、协作这些日常环节。',
    internshipNumber: '03 / 实习经历',
    internshipNote: '制造业运营',
    internshipTitle: '医疗器械制造企业实习',
    internshipDescription: '实习期间接触了库存核对、库存记录管理，以及订单跟进、物流协调、文档整理和团队间沟通。',
    skillsNumber: '04 / 技能',
    skillsNote: '工具与关注领域',
    skillGroups: [
      { title: '商业', items: '国际商务 · 商业分析 · 客户洞察' },
      { title: '供应链', items: '跨境物流 · 库存管理 · 订单跟进' },
      { title: '数据与工具', items: 'Python · Pandas · Streamlit · Plotly · Excel · AI 工具' }
    ],
    projectsNumber: '05 / 精选项目',
    projectsNote: '独立项目 · 模拟数据',
    workHeading: <>从一个问题，<br />到一次<span className="red">尝试。</span></>,
    problem: '业务场景',
    why: '项目缘起',
    solution: '项目内容',
    technology: '使用工具',
    demo: '在线体验',
    github: '查看代码',
    resumeNumber: '06 / 简历',
    resumeNote: '中英文版本',
    resumeHeading: <>我的<br /><span className="red">简历。</span></>,
    englishResume: '下载英文简历',
    chineseResume: '下载中文简历',
    contactNumber: '07 / 联系方式',
    contactNote: '欢迎交流',
    contactHeading: "LET'S CONNECT / 联系我",
    contactDescription: '欢迎就国际商务、商业分析、供应链或数字化运营与我交流。',
    emailMe: '给我发邮件',
    copyEmail: '复制邮箱',
    emailCopied: '邮箱已复制！',
    emailCopyError: '邮箱复制失败。',
    footerEmail: '邮箱',
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
  const [emailCopyStatus, setEmailCopyStatus] = useState('');
  const t = copy[language];
  const isChinese = language === 'zh';

  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
        setEmailCopyStatus('copied');
        return;
      }
    } catch {
      // Fall back to the legacy copy command when Clipboard API access is denied.
    }

    let copied = false;
    const textarea = document.createElement('textarea');
    textarea.value = CONTACT_EMAIL;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    try {
      textarea.select();
      copied = document.execCommand('copy');
    } catch {
      copied = false;
    } finally {
      textarea.remove();
    }
    setEmailCopyStatus(copied ? 'copied' : 'error');
  }

  useEffect(() => {
    document.documentElement.lang = isChinese ? 'zh-CN' : 'en';
  }, [isChinese]);

  return (
    <>
      <header className="site-header wrap">
        <a className="wordmark" href="#top" aria-label="ASHLEY home">ASHLEY<span className="red trademark">®</span></a>
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
              <h1 id="hero-title"><span className="hero-primary-name">{isChinese ? '潘虹宇' : 'Hongyu Pan'}</span><span className="hero-secondary-name">{isChinese ? 'Hongyu Pan' : '潘虹宇'}</span></h1>
              <p className="hero-role">{t.role}</p>
              <p className="hero-focus">{t.focus}</p>
              <p className="hero-intro">{t.intro}</p>
              <div className="hero-actions">
                <a className="button button-dark" href="#projects">{t.viewProjects}<span aria-hidden="true">↗</span></a>
                <a className="button button-outline" href="#resume">{t.downloadResume}<span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <div className="hero-index" aria-hidden="true"><span>{isChinese ? '国际商务' : 'INTERNATIONAL'}</span><strong>{isChinese ? <>商业<br />× 数据<br /><i>× 数字化</i></> : <>BUSINESS<br />× DATA<br /><i>× DIGITAL</i></>}</strong><span className="index-mark">A.</span></div>
          </div>
          <div className="hero-bottomline"><span>{isChinese ? '商业 / 运营 / 数字产品' : 'BUSINESS / OPERATIONS / DIGITAL PRODUCTS'}</span><span>01 — 07</span></div>
        </section>

        <section id="education" className="education section wrap">
          <div className="section-heading"><span>{t.educationNumber}</span><span>{t.educationNote}</span></div>
          <article className="education-feature">
            <div className="education-date">{isChinese ? '2026.09 — 至今' : '2026.09 — PRESENT'}<span>{isChinese ? '研究生阶段' : 'GRADUATE STUDIES'}</span></div>
            <div className="education-copy">
              <p className="education-label">{t.graduateLabel}</p>
              <h2 className="education-institutions">
                <span className="education-institution education-institution-primary">{isChinese ? '对外经济贸易大学' : 'University of International Business and Economics (UIBE)'}</span>
                <span className="education-join">{isChinese ? '×' : '&'}</span>
                <span className="education-institution education-institution-secondary">{isChinese ? '商务部国际贸易经济合作研究院' : 'Chinese Academy of International Trade and Economic Cooperation (CAITEC)'}</span>
              </h2>
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
          <div className="experience-card"><span className="experience-index">{isChinese ? '实习记录 / 01' : 'FIELD NOTES / 01'}</span><div><h2>{t.internshipTitle}</h2><p>{t.internshipDescription}</p></div><span className="experience-mark" aria-hidden="true">↗</span></div>
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
              <div className="project-main"><h3>{project.title[language]}</h3></div>
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
            <a className="button button-dark" href={`${import.meta.env.BASE_URL}resumes/Hongyu_Pan_EN_revised.pdf`} download>{t.englishResume}<span aria-hidden="true">↓</span></a>
            <a className="button button-outline" href={`${import.meta.env.BASE_URL}resumes/潘虹宇-简历-修订版.pdf`} download>{t.chineseResume}<span aria-hidden="true">↓</span></a>
          </div></div>
        </section>

        <section id="contact" className="contact">
          <div className="wrap">
            <div className="section-heading"><span>{t.contactNumber}</span><span>{t.contactNote}</span></div>
            <h2>{t.contactHeading}</h2>
            <p>{t.contactDescription}</p>
            <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <div className="contact-actions">
              <a className="button button-dark" href={`mailto:${CONTACT_EMAIL}`}>{t.emailMe}<span aria-hidden="true">↗</span></a>
              <button className="button button-outline copy-email-button" type="button" onClick={copyEmail}>{t.copyEmail}<span aria-hidden="true">↗</span></button>
              {emailCopyStatus && <span className="email-copy-status" aria-live="polite">{emailCopyStatus === 'copied' ? t.emailCopied : t.emailCopyError}</span>}
            </div>
            <div className="contact-links">
              <a href="https://github.com/sharkie-204218" target="_blank" rel="noopener noreferrer">{t.githubProfile} ↗</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer wrap"><span>© 2026 ASHLEY® — {t.footer}</span><a href={`mailto:${CONTACT_EMAIL}`}>{t.footerEmail}</a><a href="#top">{t.backToTop}</a></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
