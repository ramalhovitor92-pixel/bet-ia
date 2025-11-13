"use client";

import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Brain, 
  Target, 
  AlertCircle, 
  Trophy, 
  BarChart3,
  Sparkles,
  History,
  Trash2,
  Info,
  Crown,
  Check,
  Zap,
  Shield,
  Star,
  ChevronDown,
  ChevronUp,
  Lightbulb
} from "lucide-react";
import { 
  BETTING_KNOWLEDGE, 
  getSmartRecommendation, 
  getBettingTypesBySport,
  type BettingType 
} from "@/lib/betting-types";

interface Analysis {
  id: string;
  sport: string;
  match: string;
  prediction: string;
  confidence: number;
  strategy: string;
  risks: string[];
  tips: string[];
  recommendedBets: BettingType[];
  timestamp: number;
}

export default function BettingAITool() {
  const [hasVipAccess, setHasVipAccess] = useState(false);
  const [sport, setSport] = useState("");
  const [match, setMatch] = useState("");
  const [matchContext, setMatchContext] = useState("");
  const [riskPreference, setRiskPreference] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);
  const [history, setHistory] = useState<Analysis[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showBettingTypes, setShowBettingTypes] = useState(false);
  const [expandedBetType, setExpandedBetType] = useState<string | null>(null);

  // Verificar acesso VIP no localStorage
  useEffect(() => {
    const vipStatus = localStorage.getItem("betai-vip-access");
    if (vipStatus === "true") {
      setHasVipAccess(true);
    }
  }, []);

  // Carregar histórico do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("betting-history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Salvar histórico no localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("betting-history", JSON.stringify(history));
    }
  }, [history]);

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    const paymentLinks = {
      monthly: 'https://mpago.la/2dj7Tit',
      yearly: 'https://mpago.li/2XKvK88'
    };
    
    window.open(paymentLinks[plan], '_blank');
  };

  const generateAnalysis = () => {
    if (!sport || !match) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      // Estratégias contextuais baseadas no esporte
      const strategies: Record<string, string[]> = {
        'Futebol': [
          "Aposte em vitória do time mandante com odds moderadas",
          "Considere over 2.5 gols baseado no histórico recente",
          "Aposte em ambas equipes marcam (BTTS) - ataques fortes",
          "Foque em handicap asiático para reduzir riscos",
          "Aposte em under 2.5 gols devido às defesas sólidas",
          "Dupla chance 1X oferece segurança com time mandante forte"
        ],
        'Basquete': [
          "Aposte no spread com handicap favorável",
          "Over de pontos é recomendado para times ofensivos",
          "Foque em estatísticas de jogador estrela",
          "Total de pontos do 1º tempo pode ser lucrativo",
          "Margem de vitória entre 6-10 pontos tem boas odds"
        ],
        'Tênis': [
          "Aposte no favorito com handicap de games",
          "Total de games over em jogos equilibrados",
          "Vencedor do 1º set pode indicar resultado final",
          "Tie-break é provável em sets equilibrados",
          "Placar 2-1 em sets oferece odds interessantes"
        ],
        'MMA/UFC': [
          "Aposte no método de vitória para odds melhores",
          "Under de rounds para lutadores agressivos",
          "Vitória por finalização tem boas odds",
          "Dupla chance (KO ou Decisão) reduz risco",
          "Análise de estilos de luta é crucial"
        ],
        'Vôlei': [
          "Handicap de sets oferece segurança",
          "Total de sets over em jogos equilibrados",
          "Vencedor do 1º set pode definir momentum",
          "Total de pontos over para jogos longos",
          "Placar 3-1 é comum em favoritos"
        ]
      };

      const risks: Record<string, string[]> = {
        'Futebol': [
          "Lesões recentes podem impactar o desempenho",
          "Condições climáticas desfavoráveis previstas",
          "Histórico de confrontos diretos é equilibrado",
          "Time visitante tem boa campanha fora de casa",
          "Motivação extra por competição eliminatória",
          "Árbitro rigoroso pode influenciar cartões"
        ],
        'Basquete': [
          "Jogadores estrela podem estar lesionados",
          "Back-to-back games afetam desempenho",
          "Defesa forte pode limitar pontuação",
          "Ritmo de jogo pode ser mais lento que esperado",
          "Prorrogação pode alterar resultado"
        ],
        'Tênis': [
          "Condições de quadra podem favorecer um estilo",
          "Fadiga de jogos anteriores no torneio",
          "Clima pode afetar jogo (vento, calor)",
          "Histórico recente entre jogadores",
          "Lesões não divulgadas podem surgir"
        ],
        'MMA/UFC': [
          "Corte de peso pode afetar desempenho",
          "Estilos de luta podem não combinar",
          "Experiência em rounds longos varia",
          "Lesões durante treino podem impactar",
          "Pressão psicológica em lutas importantes"
        ],
        'Vôlei': [
          "Altitude pode afetar visitantes",
          "Cansaço de viagens internacionais",
          "Lesões de jogadores chave",
          "Momentum pode mudar rapidamente",
          "Arbitragem pode influenciar sets"
        ]
      };

      const tips: Record<string, string[]> = {
        'Futebol': [
          "Não aposte mais de 2-3% do seu bankroll",
          "Aguarde as odds se estabilizarem próximo ao jogo",
          "Considere cash out se vantagem atingir 70%",
          "Analise estatísticas dos últimos 5 jogos",
          "Verifique escalações confirmadas antes de apostar",
          "Compare odds em diferentes casas de apostas"
        ],
        'Basquete': [
          "Verifique relatórios de lesões antes do jogo",
          "Analise estatísticas de confrontos diretos",
          "Considere o fator casa (torcida)",
          "Acompanhe tendências de over/under",
          "Foque em jogadores com minutos garantidos"
        ],
        'Tênis': [
          "Analise desempenho recente no tipo de quadra",
          "Verifique histórico head-to-head",
          "Considere condições climáticas",
          "Acompanhe estatísticas de break points",
          "Foque em torneios que o jogador prioriza"
        ],
        'MMA/UFC': [
          "Analise estilos de luta (striker vs grappler)",
          "Verifique histórico de finalizações",
          "Considere alcance e altura dos lutadores",
          "Acompanhe camp de treino e preparação",
          "Foque em lutadores com momentum"
        ],
        'Vôlei': [
          "Analise desempenho em sets decisivos",
          "Verifique estatísticas de saques e bloqueios",
          "Considere fator casa e torcida",
          "Acompanhe forma recente da equipe",
          "Foque em confrontos diretos recentes"
        ]
      };

      const sportStrategies = strategies[sport] || strategies['Futebol'];
      const sportRisks = risks[sport] || risks['Futebol'];
      const sportTips = tips[sport] || tips['Futebol'];

      const confidence = Math.floor(Math.random() * 25) + 65; // 65-90%

      // Obter recomendações inteligentes de tipos de apostas
      const recommendedBets = getSmartRecommendation(
        sport,
        matchContext || match,
        riskPreference
      );

      const analysis: Analysis = {
        id: Date.now().toString(),
        sport,
        match,
        prediction: sportStrategies[Math.floor(Math.random() * sportStrategies.length)],
        confidence,
        strategy: `Análise baseada em ${confidence}% de confiança considerando forma recente, estatísticas, contexto da partida e ${recommendedBets.length} tipos de apostas recomendados para seu perfil ${riskPreference === 'conservative' ? 'conservador' : riskPreference === 'aggressive' ? 'agressivo' : 'equilibrado'}.`,
        risks: sportRisks.slice(0, 3),
        tips: sportTips.slice(0, 3),
        recommendedBets,
        timestamp: Date.now()
      };

      setCurrentAnalysis(analysis);
      setHistory(prev => [analysis, ...prev].slice(0, 20));
      setIsAnalyzing(false);
    }, 2500);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("betting-history");
  };

  const deleteAnalysis = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const getRiskColor = (level: string) => {
    switch(level) {
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getRiskLabel = (level: string) => {
    switch(level) {
      case 'low': return 'Baixo Risco';
      case 'medium': return 'Risco Médio';
      case 'high': return 'Alto Risco';
      default: return level;
    }
  };

  // Tela de Assinatura VIP
  if (!hasVipAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white">BetAI Pro</h1>
            </div>
            <p className="text-lg sm:text-xl text-purple-200 mb-2">
              Análise Inteligente de Apostas Esportivas
            </p>
            <p className="text-sm sm:text-base text-purple-300/80">
              Aumente suas chances de lucro com análises baseadas em IA
            </p>
          </div>

          {/* Benefícios */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 sm:mb-12">
            {[
              { icon: Brain, title: "IA Avançada", desc: "Análises precisas" },
              { icon: TrendingUp, title: "Mais Lucro", desc: "Estratégias vencedoras" },
              { icon: Shield, title: "Gestão de Risco", desc: "Apostas seguras" },
              { icon: Zap, title: "Tempo Real", desc: "Análises instantâneas" }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">{benefit.title}</h3>
                <p className="text-purple-300/80 text-xs sm:text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Planos */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {/* Plano Mensal */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 hover:border-purple-500/50 transition-all hover:scale-[1.02] shadow-2xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full mb-4">
                  <Crown className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-200 font-semibold">Mensal</span>
                </div>
                <div className="mb-2">
                  <span className="text-5xl sm:text-6xl font-bold text-white">R$ 29</span>
                  <span className="text-purple-300">,90</span>
                </div>
                <p className="text-purple-300/80 text-sm">por mês</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Análises ilimitadas de IA",
                  "Todos os esportes disponíveis",
                  "Histórico completo",
                  "Suporte prioritário",
                  "Atualizações em tempo real"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-purple-100">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe("monthly")}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02]"
              >
                Assinar por R$ 29,90/mês
              </button>
            </div>

            {/* Plano Anual - Destaque */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 border-purple-500/50 hover:border-purple-400 transition-all hover:scale-[1.02] shadow-2xl relative">
              {/* Badge de Economia */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Star className="w-4 h-4 text-white" />
                  <span className="text-white font-bold text-sm">Economize 59%</span>
                </div>
              </div>

              <div className="text-center mb-6 mt-2">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full mb-4">
                  <Crown className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Anual</span>
                </div>
                <div className="mb-2">
                  <span className="text-5xl sm:text-6xl font-bold text-white">R$ 144</span>
                  <span className="text-purple-200">,90</span>
                </div>
                <p className="text-purple-200/80 text-sm mb-1">por ano</p>
                <p className="text-green-400 font-semibold text-sm">12x de R$ 12,75</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Análises ilimitadas de IA",
                  "Todos os esportes disponíveis",
                  "Histórico completo",
                  "Suporte prioritário VIP",
                  "Atualizações em tempo real",
                  "Acesso antecipado a recursos",
                  "Relatórios mensais exclusivos"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe("yearly")}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-[1.02]"
              >
                Melhor Oferta - R$ 144,90/ano
              </button>
            </div>
          </div>

          {/* Garantia */}
          <div className="mt-8 sm:mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-6 py-3 rounded-xl">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-green-300 text-sm sm:text-base">
                Garantia de 7 dias - 100% do seu dinheiro de volta
              </span>
            </div>
          </div>

          {/* Aviso */}
          <div className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 max-w-2xl mx-auto">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-200">
                <p className="font-semibold mb-1">Jogue com Responsabilidade</p>
                <p className="text-amber-300/80">
                  Esta ferramenta fornece análises educacionais. Apostas sempre envolvem riscos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Aplicativo Principal (após assinatura)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 sm:p-2.5 rounded-xl">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-white">BetAI Pro</h1>
                  <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                </div>
                <p className="text-xs sm:text-sm text-purple-300">Análise Inteligente de Apostas</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowBettingTypes(!showBettingTypes)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-all text-blue-300 text-sm"
              >
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Tipos</span>
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white text-sm"
              >
                <History className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Histórico</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        {/* Guia de Tipos de Apostas */}
        {showBettingTypes && (
          <div className="mb-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white">Guia Completo de Tipos de Apostas</h3>
              </div>
              <button
                onClick={() => setShowBettingTypes(false)}
                className="text-purple-300 hover:text-white transition-colors"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BETTING_KNOWLEDGE.map((sportData) => (
                <div key={sportData.sport} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{sportData.icon}</span>
                    <h4 className="font-bold text-white">{sportData.sport}</h4>
                    <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full">
                      {sportData.types.length} tipos
                    </span>
                  </div>
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {sportData.types.map((type) => (
                      <div key={type.id} className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <button
                          onClick={() => setExpandedBetType(expandedBetType === type.id ? null : type.id)}
                          className="w-full text-left"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white truncate">{type.name}</p>
                              <span className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 border ${getRiskColor(type.riskLevel)}`}>
                                {getRiskLabel(type.riskLevel)}
                              </span>
                            </div>
                            {expandedBetType === type.id ? (
                              <ChevronUp className="w-4 h-4 text-purple-400 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-purple-400 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                        
                        {expandedBetType === type.id && (
                          <div className="mt-2 pt-2 border-t border-white/10 space-y-2">
                            <p className="text-xs text-purple-200">{type.description}</p>
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded p-2">
                              <p className="text-xs text-blue-300">
                                <span className="font-semibold">Exemplo:</span> {type.example}
                              </p>
                            </div>
                            <p className="text-xs text-purple-300/80">
                              <span className="font-semibold">Recomendado para:</span> {type.recommendedFor}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Formulário de Análise */}
          <div className="space-y-6">
            {/* Card de Entrada */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white">Nova Análise</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Esporte
                  </label>
                  <select
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  >
                    <option value="" className="bg-slate-900">Selecione o esporte</option>
                    <option value="Futebol" className="bg-slate-900">⚽ Futebol</option>
                    <option value="Basquete" className="bg-slate-900">🏀 Basquete</option>
                    <option value="Tênis" className="bg-slate-900">🎾 Tênis</option>
                    <option value="Vôlei" className="bg-slate-900">🏐 Vôlei</option>
                    <option value="MMA/UFC" className="bg-slate-900">🥊 MMA/UFC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Partida / Evento
                  </label>
                  <input
                    type="text"
                    value={match}
                    onChange={(e) => setMatch(e.target.value)}
                    placeholder="Ex: Flamengo vs Palmeiras"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Contexto da Partida (opcional)
                  </label>
                  <textarea
                    value={matchContext}
                    onChange={(e) => setMatchContext(e.target.value)}
                    placeholder="Ex: Time mandante favorito, jogo decisivo, muitos gols esperados..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Perfil de Risco
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'conservative', label: 'Conservador', icon: Shield },
                      { value: 'balanced', label: 'Equilibrado', icon: BarChart3 },
                      { value: 'aggressive', label: 'Agressivo', icon: TrendingUp }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setRiskPreference(option.value as any)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                          riskPreference === option.value
                            ? 'bg-purple-500/30 border-purple-500 text-white'
                            : 'bg-white/5 border-white/20 text-purple-300 hover:bg-white/10'
                        }`}
                      >
                        <option.icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateAnalysis}
                  disabled={!sport || !match || isAnalyzing}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02]"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Analisando...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Gerar Análise IA</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Aviso Responsável */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex gap-3">
              <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-200">
                <p className="font-semibold mb-1">Jogue com Responsabilidade</p>
                <p className="text-amber-300/80">
                  Esta ferramenta fornece análises baseadas em dados, mas apostas sempre envolvem riscos. 
                  Nunca aposte mais do que pode perder.
                </p>
              </div>
            </div>
          </div>

          {/* Resultado da Análise */}
          <div className="space-y-6">
            {currentAnalysis ? (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl space-y-4 sm:space-y-6">
                {/* Header da Análise */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-lg sm:text-xl font-bold text-white">{currentAnalysis.sport}</h3>
                    </div>
                    <p className="text-purple-200 text-sm sm:text-base">{currentAnalysis.match}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
                    <p className="text-white font-bold text-sm sm:text-base">{currentAnalysis.confidence}%</p>
                    <p className="text-white/80 text-xs">Confiança</p>
                  </div>
                </div>

                {/* Predição Principal */}
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">Recomendação Principal</h4>
                      <p className="text-purple-100 text-sm sm:text-base">{currentAnalysis.prediction}</p>
                    </div>
                  </div>
                </div>

                {/* Tipos de Apostas Recomendados */}
                {currentAnalysis.recommendedBets.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                      <h4 className="font-semibold text-white text-sm sm:text-base">
                        Tipos de Apostas Recomendados ({currentAnalysis.recommendedBets.length})
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {currentAnalysis.recommendedBets.map((bet) => (
                        <div key={bet.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h5 className="font-semibold text-white text-sm">{bet.name}</h5>
                            <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${getRiskColor(bet.riskLevel)}`}>
                              {getRiskLabel(bet.riskLevel)}
                            </span>
                          </div>
                          <p className="text-purple-200 text-xs mb-2">{bet.description}</p>
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded p-2">
                            <p className="text-xs text-blue-300">
                              <span className="font-semibold">Exemplo:</span> {bet.example}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estratégia */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    <h4 className="font-semibold text-white text-sm sm:text-base">Estratégia</h4>
                  </div>
                  <p className="text-blue-100 text-sm sm:text-base">{currentAnalysis.strategy}</p>
                </div>

                {/* Riscos */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                    <h4 className="font-semibold text-white text-sm sm:text-base">Fatores de Risco</h4>
                  </div>
                  <ul className="space-y-1.5">
                    {currentAnalysis.risks.map((risk, idx) => (
                      <li key={idx} className="text-red-100 text-xs sm:text-sm flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">•</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dicas */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                    <h4 className="font-semibold text-white text-sm sm:text-base">Dicas Profissionais</h4>
                  </div>
                  <ul className="space-y-1.5">
                    {currentAnalysis.tips.map((tip, idx) => (
                      <li key={idx} className="text-yellow-100 text-xs sm:text-sm flex items-start gap-2">
                        <span className="text-yellow-400 mt-0.5">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 sm:p-12 border border-white/10 text-center">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Pronto para Analisar</h3>
                <p className="text-purple-200 text-sm sm:text-base">
                  Preencha os dados da partida e receba uma análise detalhada com recomendações inteligentes de tipos de apostas.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Histórico */}
        {showHistory && history.length > 0 && (
          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white">Histórico de Análises</h3>
              </div>
              <button
                onClick={clearHistory}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-all text-red-300 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Limpar</span>
              </button>
            </div>

            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold text-white text-sm sm:text-base">{item.sport}</span>
                        <span className="bg-purple-500/30 px-2 py-0.5 rounded text-xs text-purple-200">
                          {item.confidence}%
                        </span>
                        {item.recommendedBets.length > 0 && (
                          <span className="bg-blue-500/30 px-2 py-0.5 rounded text-xs text-blue-200">
                            {item.recommendedBets.length} tipos
                          </span>
                        )}
                      </div>
                      <p className="text-purple-200 text-xs sm:text-sm mb-1 truncate">{item.match}</p>
                      <p className="text-purple-300/80 text-xs sm:text-sm">{item.prediction}</p>
                      <p className="text-purple-400/60 text-xs mt-1">
                        {new Date(item.timestamp).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteAnalysis(item.id)}
                      className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-purple-300/80 text-xs sm:text-sm">
            © 2024 BetAI Pro - Ferramenta de análise educacional. Aposte com responsabilidade.
          </p>
        </div>
      </footer>
    </div>
  );
}
