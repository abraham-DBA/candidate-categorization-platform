import Candidate from "../models/candidate.model.js";

export const determineTier = (skills) => {
  const skillSet = skills.map(s => s.toLowerCase());

  const hasHTMLCSSJS = skillSet.includes('html') && skillSet.includes('css') && skillSet.includes('javascript');
  const hasNextReact = skillSet.includes('nextjs') || skillSet.includes('react');
  const hasCRUD = skillSet.includes('crud');
  const hasAuth = skillSet.includes('auth');
  const hasDeployment = skillSet.includes('deployment');
  const hasExpressHono = skillSet.includes('express') || skillSet.includes('hono');
  const hasAPIDocs = skillSet.includes('apidocs');
  const hasGolang = skillSet.includes('golang');
  const hasLaravel = skillSet.includes('laravel');

  // Tier 0: Beginner
  if (hasHTMLCSSJS && hasNextReact && !hasCRUD) return 0;

  // Tier 1: CRUD Developer
  if (hasCRUD && !hasAuth) return 1;

  // Tier 2: Full-Stack Next.js
  if (hasCRUD && hasAuth && hasDeployment && !hasExpressHono && !hasGolang) return 2;

  // Tier 3: Multi-Framework
  if ((hasExpressHono || hasLaravel) && hasCRUD && hasAuth && !hasGolang) return 3;

  // Tier 4: Advanced Full-Stack
  if (hasGolang && hasCRUD && hasAuth && (hasExpressHono || hasLaravel)) return 4;

  // Default fallback
  return 0;
};


export const registerCandidate = async (req, res) => {
    try {
        const { name, email, phone, skills } = req.body;
        const tier = determineTier(skills);
        const candidate = new Candidate({ name, email, phone, skills, tier });
        await candidate.save();
        res.status(201).json(candidate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllCandidates = async (req, res) => {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json(candidates);
}