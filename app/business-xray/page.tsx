"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Download, Shield, Target, Users, TrendingUp, FileCheck } from "lucide-react";

interface QualificationData {
  organisationType: string;
  revenueBand: string;
  teamSize: string;
  decisionAuthority: string;
  organisationName: string;
  contactEmail: string;
}

interface AssessmentResponse {
  pillar: string;
  questionId: string;
  score: number;
  weight: number;
}

const QUALIFICATION_CRITERIA = {
  minRevenue: 100000, // £100k
  minTeamSize: 5,
};

const PILLARS = [
  {
    id: 'strategic-clarity',
    name: 'Strategic Clarity',
    icon: Target,
    questions: [
      { id: 'sc1', text: 'Is your vision documented and communicated across all levels?', weight: 3 },
      { id: 'sc2', text: 'Are strategic targets broken down into operational objectives?', weight: 3 },
      { id: 'sc3', text: 'Are KPIs reviewed consistently with defined cadences?', weight: 2 },
      { id: 'sc4', text: 'Is there alignment between leadership on strategic priorities?', weight: 3 },
      { id: 'sc5', text: 'Are strategic decisions documented with clear rationale?', weight: 2 },
    ]
  },
  {
    id: 'operational-stability',
    name: 'Operational Stability',
    icon: Users,
    questions: [
      { id: 'os1', text: 'Are roles and responsibilities clearly defined and documented?', weight: 3 },
      { id: 'os2', text: 'Is there minimal process dependency on key individuals?', weight: 3 },
      { id: 'os3', text: 'Are standard operating procedures maintained and updated?', weight: 2 },
      { id: 'os4', text: 'Is knowledge transfer structured for critical functions?', weight: 2 },
      { id: 'os5', text: 'Are operational metrics tracked and acted upon?', weight: 2 },
    ]
  },
  {
    id: 'client-governance',
    name: 'Client Governance',
    icon: Shield,
    questions: [
      { id: 'cg1', text: 'Is client onboarding structured and consistent?', weight: 3 },
      { id: 'cg2', text: 'Are regular review cadences defined with clients?', weight: 2 },
      { id: 'cg3', text: 'Is client retention measured and actively managed?', weight: 3 },
      { id: 'cg4', text: 'Are client satisfaction metrics tracked systematically?', weight: 2 },
      { id: 'cg5', text: 'Is client feedback integrated into service improvement?', weight: 2 },
    ]
  },
  {
    id: 'revenue-structure',
    name: 'Revenue Structure',
    icon: TrendingUp,
    questions: [
      { id: 'rs1', text: 'Is revenue predictable with defined recurring elements?', weight: 3 },
      { id: 'rs2', text: 'Are expansion pathways clearly defined and executed?', weight: 3 },
      { id: 'rs3', text: 'Is pricing discipline maintained across all services?', weight: 2 },
      { id: 'rs4', text: 'Are revenue forecasts accurate and reliable?', weight: 2 },
      { id: 'rs5', text: 'Is revenue diversification strategically managed?', weight: 2 },
    ]
  },
  {
    id: 'risk-compliance',
    name: 'Risk & Compliance Control',
    icon: FileCheck,
    questions: [
      { id: 'rc1', text: 'Are compliance policies documented and current?', weight: 3 },
      { id: 'rc2', text: 'Is the organisation prepared for regulatory audits?', weight: 3 },
      { id: 'rc3', text: 'Is financial oversight structured with proper controls?', weight: 3 },
      { id: 'rc4', text: 'Are risk assessments conducted regularly?', weight: 2 },
      { id: 'rc5', text: 'Is business continuity planning in place?', weight: 2 },
    ]
  },
];

export default function BusinessXrayPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState('intro'); // intro, qualification, assessment, results
  const [qualificationData, setQualificationData] = useState<QualificationData>({
    organisationType: '',
    revenueBand: '',
    teamSize: '',
    decisionAuthority: '',
    organisationName: '',
    contactEmail: '',
  });
  const [currentPillar, setCurrentPillar] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQualificationSubmit = () => {
    // Extract revenue value from the selected band
    let revenue = 0;
    if (qualificationData.revenueBand.includes('50000-100000')) revenue = 50000;
    else if (qualificationData.revenueBand.includes('100000-500000')) revenue = 100000;
    else if (qualificationData.revenueBand.includes('500000-1000000')) revenue = 500000;
    else if (qualificationData.revenueBand.includes('1000000-5000000')) revenue = 1000000;
    else if (qualificationData.revenueBand.includes('5000000+')) revenue = 5000000;

    // Extract team size value from the selected band
    let teamSize = 0;
    if (qualificationData.teamSize.includes('1-5')) teamSize = 1;
    else if (qualificationData.teamSize.includes('5-20')) teamSize = 5;
    else if (qualificationData.teamSize.includes('20-50')) teamSize = 20;
    else if (qualificationData.teamSize.includes('50-100')) teamSize = 50;
    else if (qualificationData.teamSize.includes('100+')) teamSize = 100;

    if (revenue < QUALIFICATION_CRITERIA.minRevenue || teamSize < QUALIFICATION_CRITERIA.minTeamSize) {
      alert('This assessment is designed for established organisations. Please contact us directly.');
      return;
    }

    setCurrentStep('assessment');
  };

  const handleResponse = (questionId: string, score: number, weight: number) => {
    const newResponses = responses.filter(r => r.questionId !== questionId);
    newResponses.push({
      pillar: PILLARS[currentPillar].id,
      questionId,
      score,
      weight
    });
    setResponses(newResponses);
  };

  const calculatePillarScore = (pillarId: string) => {
    const pillarResponses = responses.filter(r => r.pillar === pillarId);
    if (pillarResponses.length === 0) return 0;
    
    const totalWeighted = pillarResponses.reduce((sum, r) => sum + (r.score * r.weight), 0);
    const totalWeight = pillarResponses.reduce((sum, r) => sum + r.weight, 0);
    
    return Math.round((totalWeighted / totalWeight) * 20); // Convert to percentage
  };

  const getOverallScore = () => {
    const pillarScores = PILLARS.map(p => calculatePillarScore(p.id));
    return Math.round(pillarScores.reduce((sum, score) => sum + score, 0) / PILLARS.length);
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Low Risk', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 60) return { level: 'Medium Risk', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'High Risk', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const handleDownloadReport = async () => {
    try {
      // Generate a reference ID if not already available
      const referenceId = `HADSUL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Determine risk level
      const overallScore = getOverallScore();
      const getRiskLevelText = (score: number) => {
        if (score >= 80) return 'Low Risk';
        if (score >= 60) return 'Medium Risk';
        return 'High Risk';
      };
      
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qualificationData,
          pillarScores: PILLARS.map(p => ({
            pillar: p.id,
            score: calculatePillarScore(p.id)
          })),
          overallScore,
          riskLevel: getRiskLevelText(overallScore),
          referenceId,
        }),
      });

      if (response.ok) {
        // Create blob from response
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Executive-XRay-Report-${qualificationData.organisationName.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to generate PDF report. Please try again or contact support.');
    }
  };

  const handleRequestReview = () => {
    router.push('/contact');
  };

  const handleSubmitAssessment = async () => {
    setIsSubmitting(true);
    
    try {
      // Submit to backend
      const response = await fetch('/api/executive-xray', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qualificationData,
          responses,
          pillarScores: PILLARS.map(p => ({
            pillar: p.id,
            score: calculatePillarScore(p.id)
          })),
          overallScore: getOverallScore(),
        }),
      });

      if (response.ok) {
        setCurrentStep('results');
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentStep === 'intro') {
    return (
      <main>
        <Header variant="light" />
        <PageHeader 
          badge="  " 
          title="Executive X-Ray™"
          description="A structured organisational diagnostic designed to identify blind spots, risk exposure, and strategic misalignment before they become operational failures."
        />
        
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Executive Integrated Diagnostic System
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                This assessment is designed for established organisations seeking strategic clarity and operational excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4"> This Is:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• A structured organisational diagnostic</li>
                  <li>• A qualification filter</li>
                  <li>• A positioning tool</li>
                  <li>• A conversion bridge into higher-tier services</li>
                </ul>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4"> This Is NOT:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• A free quiz</li>
                  <li>• A lead magnet</li>
                  <li>• A surface-level assessment</li>
                  <li>• A public scoring system</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => setCurrentStep('qualification')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg"
              >
                Begin Assessment
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  if (currentStep === 'qualification') {
    return (
      <main>
        <Header isAssessmentMode={true} />
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background min-h-screen">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Qualification Gate
              </h2>
              <p className="text-muted-foreground">
                Please confirm your organisation details to proceed.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Organisation Name *
                </label>
                <Input
                  value={qualificationData.organisationName}
                  onChange={(e) => setQualificationData({...qualificationData, organisationName: e.target.value})}
                  placeholder="Enter organisation name"
                  className="text-foreground bg-background"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contact Email *
                </label>
                <Input
                  type="email"
                  value={qualificationData.contactEmail}
                  onChange={(e) => setQualificationData({...qualificationData, contactEmail: e.target.value})}
                  placeholder="Enter contact email"
                  className="text-foreground bg-background"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Organisation Type *
                </label>
                <select
                  value={qualificationData.organisationType}
                  onChange={(e) => setQualificationData({...qualificationData, organisationType: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  required
                >
                  <option value="" disabled hidden>Select organisation type</option>
                  <option value="private-company">Private Company</option>
                  <option value="public-company">Public Company</option>
                  <option value="partnership">Partnership</option>
                  <option value="non-profit">Non-Profit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Annual Revenue Band *
                </label>
                <select
                  value={qualificationData.revenueBand}
                  onChange={(e) => setQualificationData({...qualificationData, revenueBand: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  required
                >
                  <option value="" disabled hidden>Select revenue band</option>
                  <option value="50000-100000">£50k - £100k</option>
                  <option value="100000-500000">£100k - £500k</option>
                  <option value="500000-1000000">£500k - £1M</option>
                  <option value="1000000-5000000">£1M - £5M</option>
                  <option value="5000000+">£5M+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Team Size *
                </label>
                <select
                  value={qualificationData.teamSize}
                  onChange={(e) => setQualificationData({...qualificationData, teamSize: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  required
                >
                  <option value="" disabled hidden>Select team size</option>
                  <option value="1-5">1-5 employees</option>
                  <option value="5-20">5-20 employees</option>
                  <option value="20-50">20-50 employees</option>
                  <option value="50-100">50-100 employees</option>
                  <option value="100+">100+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Decision-Making Authority *
                </label>
                <select
                  value={qualificationData.decisionAuthority}
                  onChange={(e) => setQualificationData({...qualificationData, decisionAuthority: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  required
                >
                  <option value="" disabled hidden>Select authority level</option>
                  <option value="ceo-owner">CEO/Owner</option>
                  <option value="c-level">C-Level Executive</option>
                  <option value="senior-management">Senior Management</option>
                  <option value="department-head">Department Head</option>
                </select>
              </div>

              <Button 
                onClick={handleQualificationSubmit}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
                disabled={!Object.values(qualificationData).every(v => v)}
              >
                Proceed to Assessment
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (currentStep === 'assessment') {
    const currentPillarData = PILLARS[currentPillar];
    const Icon = currentPillarData.icon;
    
    return (
      <main>
        <Header isAssessmentMode={true} />
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background min-h-screen">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Icon className="w-8 h-8 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-foreground">
                    {currentPillarData.name}
                  </h2>
                </div>
                <span className="text-sm text-muted-foreground">
                  Pillar {currentPillar + 1} of {PILLARS.length}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentPillar + 1) / PILLARS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <div className="space-y-8">
                {currentPillarData.questions.map((question) => (
                  <div key={question.id} className="border-b border-border pb-6 last:border-b-0">
                    <h3 className="text-lg font-medium text-foreground mb-4">
                      {question.text}
                    </h3>
                    
                    <div className="flex gap-2 justify-center">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <button
                          key={score}
                          onClick={() => handleResponse(question.id, score, question.weight)}
                          className={`w-12 h-12 rounded-full border-2 font-semibold transition-all ${
                            responses.find(r => r.questionId === question.id)?.score === score
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-gray-300 hover:border-emerald-600 text-foreground'
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Strongly Disagree</span>
                      <span>Strongly Agree</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={() => setCurrentPillar(currentPillar - 1)}
                  disabled={currentPillar === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                
                {currentPillar === PILLARS.length - 1 ? (
                  <Button
                    onClick={handleSubmitAssessment}
                    disabled={responses.length < PILLARS.reduce((sum, p) => sum + p.questions.length, 0) || isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Assessment'}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentPillar(currentPillar + 1)}
                    disabled={responses.filter(r => r.pillar === currentPillarData.id).length < currentPillarData.questions.length}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Next Pillar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (currentStep === 'results') {
    const overallScore = getOverallScore();
    const riskLevel = getRiskLevel(overallScore);
    
    return (
      <main>
        <Header isAssessmentMode={true} />
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Executive Summary Dashboard
              </h2>
              <p className="text-muted-foreground">
                Confidential diagnostic results for {qualificationData.organisationName}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{overallScore}%</div>
                <div className="text-sm text-muted-foreground">Overall Governance Score</div>
              </div>
              
              <div className={`border rounded-lg p-6 text-center ${riskLevel.bg}`}>
                <div className={`text-lg font-semibold mb-2 ${riskLevel.color}`}>{riskLevel.level}</div>
                <div className="text-sm text-muted-foreground">Risk Assessment</div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{PILLARS.length}</div>
                <div className="text-sm text-muted-foreground">Pillars Assessed</div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">Pillar Breakdown</h3>
              
              <div className="space-y-4">
                {PILLARS.map((pillar) => {
                  const score = calculatePillarScore(pillar.id);
                  const Icon = pillar.icon;
                  
                  return (
                    <div key={pillar.id} className="flex items-center gap-4">
                      <Icon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-foreground">{pillar.name}</span>
                          <span className="text-sm font-semibold text-emerald-600">{score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Strategic Observations</h3>
              <div className="prose text-muted-foreground">
                <p>Based on your assessment results, a structured intervention may be appropriate to address identified governance gaps and strengthen operational resilience.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleDownloadReport}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              
              <Button 
                onClick={handleRequestReview}
                variant="outline" 
                className="px-8 py-3 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
              >
                Request Strategic Review
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return null;
}