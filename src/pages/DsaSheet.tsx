import { useState, useMemo, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import {
  ArrowBackRounded,
  SearchRounded,
  ClearRounded,
  StarRounded,
  StarBorderRounded,
  LaunchRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
  CheckRounded,
  UnfoldMoreRounded,
  UnfoldLessRounded,
  TerminalRounded,
  SmartDisplayRounded,
  StorageRounded,
  AccountTreeRounded,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import { striverA2ZSteps, getDsaStats, type DsaStep } from "../data/striverA2ZData";
import { leetcodeSqlCategories, getSqlStats, type SqlCategory } from "../data/leetcodeSqlData";
import {
  getSystemDesignStats,
  getSystemDesignPillarGroups,
  type SystemDesignPillarGroup,
} from "../data/systemDesignData";

type SheetType = "dsa" | "sql" | "sysdesign";

export default function DsaSheet() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const rawSheet = searchParams.get("sheet");
  const activeSheet: SheetType =
    rawSheet === "sysdesign" ? "sysdesign" : rawSheet === "sql" ? "sql" : "dsa";

  const { user, setUser } = useContext(UserContext);

  const solvedIds = useMemo(
    () => new Set(user.dsaProgress?.solvedProblemIds || []),
    [user.dsaProgress?.solvedProblemIds],
  );
  const starredIds = useMemo(
    () => new Set(user.dsaProgress?.starredProblemIds || []),
    [user.dsaProgress?.starredProblemIds],
  );

  // Stats for all sheets
  const dsaStats = useMemo(
    () =>
      getDsaStats(
        user.dsaProgress?.solvedProblemIds || [],
        user.dsaProgress?.starredProblemIds || [],
      ),
    [user.dsaProgress?.solvedProblemIds, user.dsaProgress?.starredProblemIds],
  );

  const sqlStats = useMemo(
    () =>
      getSqlStats(
        user.dsaProgress?.solvedProblemIds || [],
        user.dsaProgress?.starredProblemIds || [],
      ),
    [user.dsaProgress?.solvedProblemIds, user.dsaProgress?.starredProblemIds],
  );

  const sysDesignStats = useMemo(
    () =>
      getSystemDesignStats(
        user.dsaProgress?.solvedProblemIds || [],
        user.dsaProgress?.starredProblemIds || [],
      ),
    [user.dsaProgress?.solvedProblemIds, user.dsaProgress?.starredProblemIds],
  );

  const stats =
    activeSheet === "sysdesign" ? sysDesignStats : activeSheet === "sql" ? sqlStats : dsaStats;

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unsolved" | "solved" | "starred">(
    "all",
  );
  const [difficultyFilter, setDifficultyFilter] = useState<"all" | "Easy" | "Medium" | "Hard">(
    "all",
  );
  const [sysSectionFilter, setSysSectionFilter] = useState<
    "all" | "Foundations" | "HLD" | "Design Patterns" | "LLD"
  >("all");

  const sysPillarGroups = useMemo(() => getSystemDesignPillarGroups(), []);

  // Track expanded steps
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({
    "step-1": true,
    "sql-cat-1": true,
    "sd-group-1": true,
  });

  const toggleStep = (stepId: string) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    if (activeSheet === "dsa") {
      striverA2ZSteps.forEach((s) => {
        allExpanded[s.id] = true;
      });
    } else if (activeSheet === "sql") {
      leetcodeSqlCategories.forEach((c) => {
        allExpanded[c.id] = true;
      });
    } else {
      sysPillarGroups.forEach((g) => {
        allExpanded[g.id] = true;
      });
    }
    setExpandedSteps(allExpanded);
  };

  const collapseAll = () => {
    setExpandedSteps({});
  };

  // Toggle problem solved status
  const handleToggleSolved = (problemId: string) => {
    setUser((prev) => {
      const currentSolved = prev.dsaProgress?.solvedProblemIds || [];
      const isSolved = currentSolved.includes(problemId);
      const nextSolved = isSolved
        ? currentSolved.filter((id) => id !== problemId)
        : [...currentSolved, problemId];

      return {
        ...prev,
        dsaProgress: {
          solvedProblemIds: nextSolved,
          starredProblemIds: prev.dsaProgress?.starredProblemIds || [],
        },
      };
    });
  };

  // Toggle problem bookmark / star status
  const handleToggleStarred = (problemId: string) => {
    setUser((prev) => {
      const currentStarred = prev.dsaProgress?.starredProblemIds || [];
      const isStarred = currentStarred.includes(problemId);
      const nextStarred = isStarred
        ? currentStarred.filter((id) => id !== problemId)
        : [...currentStarred, problemId];

      return {
        ...prev,
        dsaProgress: {
          solvedProblemIds: prev.dsaProgress?.solvedProblemIds || [],
          starredProblemIds: nextStarred,
        },
      };
    });
  };

  // Switch sheet
  const handleSwitchSheet = (sheet: SheetType) => {
    if (sheet === "sysdesign") {
      setSearchParams({ sheet: "sysdesign" });
    } else if (sheet === "sql") {
      setSearchParams({ sheet: "sql" });
    } else {
      setSearchParams({});
    }
    setSearchQuery("");
    setStatusFilter("all");
    setDifficultyFilter("all");
    setSysSectionFilter("all");
  };

  // Filter logic for DSA
  const filteredDsaSteps = useMemo(() => {
    if (activeSheet !== "dsa") return [];
    const query = searchQuery.trim().toLowerCase();

    return striverA2ZSteps
      .map((step) => {
        const matchingSubTopics = step.subTopics
          .map((sub) => {
            const matchingProblems = sub.problems.filter((prob) => {
              if (
                query &&
                !prob.title.toLowerCase().includes(query) &&
                !sub.title.toLowerCase().includes(query)
              ) {
                return false;
              }

              const isSolved = solvedIds.has(prob.id);
              const isStarred = starredIds.has(prob.id);
              if (statusFilter === "solved" && !isSolved) return false;
              if (statusFilter === "unsolved" && isSolved) return false;
              if (statusFilter === "starred" && !isStarred) return false;

              if (difficultyFilter !== "all" && prob.difficulty !== difficultyFilter) {
                return false;
              }

              return true;
            });

            return {
              ...sub,
              problems: matchingProblems,
            };
          })
          .filter((sub) => sub.problems.length > 0);

        return {
          ...step,
          subTopics: matchingSubTopics,
        };
      })
      .filter((step) => step.subTopics.length > 0);
  }, [activeSheet, searchQuery, statusFilter, difficultyFilter, solvedIds, starredIds]);

  // Filter logic for SQL
  const filteredSqlCategories = useMemo(() => {
    if (activeSheet !== "sql") return [];
    const query = searchQuery.trim().toLowerCase();

    return leetcodeSqlCategories
      .map((cat) => {
        const matchingProblems = cat.problems.filter((prob) => {
          if (
            query &&
            !prob.title.toLowerCase().includes(query) &&
            !cat.title.toLowerCase().includes(query)
          ) {
            return false;
          }

          const isSolved = solvedIds.has(prob.id);
          const isStarred = starredIds.has(prob.id);
          if (statusFilter === "solved" && !isSolved) return false;
          if (statusFilter === "unsolved" && isSolved) return false;
          if (statusFilter === "starred" && !isStarred) return false;

          if (difficultyFilter !== "all" && prob.difficulty !== difficultyFilter) {
            return false;
          }

          return true;
        });

        return {
          ...cat,
          problems: matchingProblems,
        };
      })
      .filter((cat) => cat.problems.length > 0);
  }, [activeSheet, searchQuery, statusFilter, difficultyFilter, solvedIds, starredIds]);

  // Filter logic for System Design
  const filteredSysGroups = useMemo(() => {
    if (activeSheet !== "sysdesign") return [];
    const query = searchQuery.trim().toLowerCase();

    return sysPillarGroups
      .map((group) => {
        const matchingProblems = group.problems.filter((prob) => {
          if (sysSectionFilter !== "all" && prob.section !== sysSectionFilter) {
            return false;
          }

          if (query) {
            const matchTitle = prob.title.toLowerCase().includes(query);
            const matchDesc = prob.description.toLowerCase().includes(query);
            const matchPillar = prob.pillar.toLowerCase().includes(query);
            const matchComponent = prob.keyComponents.some((c) => c.toLowerCase().includes(query));
            if (!matchTitle && !matchDesc && !matchPillar && !matchComponent) {
              return false;
            }
          }

          const isSolved = solvedIds.has(prob.id);
          const isStarred = starredIds.has(prob.id);
          if (statusFilter === "solved" && !isSolved) return false;
          if (statusFilter === "unsolved" && isSolved) return false;
          if (statusFilter === "starred" && !isStarred) return false;

          if (difficultyFilter !== "all" && prob.difficulty !== difficultyFilter) {
            return false;
          }

          return true;
        });

        return {
          ...group,
          problems: matchingProblems,
        };
      })
      .filter((group) => group.problems.length > 0);
  }, [
    activeSheet,
    sysPillarGroups,
    sysSectionFilter,
    searchQuery,
    statusFilter,
    difficultyFilter,
    solvedIds,
    starredIds,
  ]);

  const isFiltering =
    searchQuery.trim().length > 0 ||
    statusFilter !== "all" ||
    difficultyFilter !== "all" ||
    sysSectionFilter !== "all";

  const isStepOpen = (stepId: string) => {
    if (isFiltering) return true;
    return !!expandedSteps[stepId];
  };

  const getStepProgress = (step: DsaStep) => {
    const total = step.subTopics.reduce((acc, sub) => acc + sub.problems.length, 0);
    const solved = step.subTopics.reduce(
      (acc, sub) => acc + sub.problems.filter((p) => solvedIds.has(p.id)).length,
      0,
    );
    return { total, solved };
  };

  const getSqlCatProgress = (cat: SqlCategory) => {
    const total = cat.problems.length;
    const solved = cat.problems.filter((p) => solvedIds.has(p.id)).length;
    return { total, solved };
  };

  const getSysGroupProgress = (group: SystemDesignPillarGroup) => {
    const total = group.problems.length;
    const solved = group.problems.filter((p) => solvedIds.has(p.id)).length;
    return { total, solved };
  };

  const totalMatchingProblems =
    activeSheet === "dsa"
      ? filteredDsaSteps.reduce(
          (sum, s) => sum + s.subTopics.reduce((subSum, sub) => subSum + sub.problems.length, 0),
          0,
        )
      : activeSheet === "sql"
        ? filteredSqlCategories.reduce((sum, c) => sum + c.problems.length, 0)
        : filteredSysGroups.reduce((sum, g) => sum + g.problems.length, 0);

  return (
    <PageContainer>
      {/* Top Header */}
      <TopBar>
        <BackBtn onClick={() => navigate("/")} aria-label="Go back to tasks">
          <ArrowBackRounded sx={{ fontSize: 20 }} />
          <span>Tasks</span>
        </BackBtn>
        <HeaderBadge>
          {activeSheet === "sysdesign" ? (
            <>
              <AccountTreeRounded sx={{ fontSize: 16, color: "#10b981" }} />
              <span>Gaurav Sen System Design</span>
            </>
          ) : activeSheet === "sql" ? (
            <>
              <StorageRounded sx={{ fontSize: 16, color: "#3b82f6" }} />
              <span>LeetCode SQL Sheet</span>
            </>
          ) : (
            <>
              <TerminalRounded sx={{ fontSize: 16, color: "#7851bf" }} />
              <span>Striver A2Z DSA Tracker</span>
            </>
          )}
        </HeaderBadge>
      </TopBar>

      {/* 3-Way Sheet Switcher Tabs */}
      <SheetSwitcherRow>
        <SheetTabBtn
          active={activeSheet === "dsa"}
          onClick={() => handleSwitchSheet("dsa")}
          aria-label="Switch to A2Z DSA Sheet"
        >
          <TerminalRounded sx={{ fontSize: 18 }} />
          <span>A2Z DSA ({dsaStats.total})</span>
        </SheetTabBtn>

        <SheetTabBtn
          active={activeSheet === "sql"}
          onClick={() => handleSwitchSheet("sql")}
          aria-label="Switch to LeetCode SQL Sheet"
        >
          <StorageRounded sx={{ fontSize: 18 }} />
          <span>SQL ({sqlStats.total})</span>
        </SheetTabBtn>

        <SheetTabBtn
          active={activeSheet === "sysdesign"}
          onClick={() => handleSwitchSheet("sysdesign")}
          aria-label="Switch to System Design Sheet"
        >
          <AccountTreeRounded sx={{ fontSize: 18 }} />
          <span>System Design ({sysDesignStats.total})</span>
        </SheetTabBtn>
      </SheetSwitcherRow>

      {/* Page Title */}
      <TitleSection>
        <PageTitle>
          {activeSheet === "sysdesign"
            ? "Gaurav Sen's System Design Sheet"
            : activeSheet === "sql"
              ? "LeetCode SQL 50 & Classics"
              : "Striver's A2Z DSA Sheet"}
        </PageTitle>
        <PageSubtitle>
          {activeSheet === "sysdesign"
            ? "Master distributed systems engineering: 32 core foundations, 22 classic HLD case studies, 30 design patterns & SOLID principles, and 23 LLD machine coding problems."
            : activeSheet === "sql"
              ? "Master relational database queries with 58 curated interview questions directly linked to LeetCode."
              : "508 Curated interview questions across all 19 curriculum steps with verified practice & video solutions."}
        </PageSubtitle>
      </TitleSection>

      {/* Stats / Dashboard Card */}
      <StatsCard>
        <StatsCardTop>
          <div>
            <StatsTitle>
              {activeSheet === "sysdesign"
                ? "System Design Progress"
                : activeSheet === "sql"
                  ? "SQL Progress"
                  : "A2Z Overall Progress"}
            </StatsTitle>
            <StatsNumber>
              {stats.solved} <span className="dim">/ {stats.total} Solved</span>
            </StatsNumber>
          </div>
          <PercentageBadge percentage={stats.percentage}>{stats.percentage}%</PercentageBadge>
        </StatsCardTop>

        <ProgressBarTrack>
          <ProgressBarFill width={stats.percentage} />
        </ProgressBarTrack>

        <StatsChipsRow>
          <StatChip difficulty="Easy">
            <span className="dot" />
            <span>
              Easy: {stats.easySolved}/{stats.easyTotal}
            </span>
          </StatChip>
          <StatChip difficulty="Medium">
            <span className="dot" />
            <span>
              Medium: {stats.medSolved}/{stats.medTotal}
            </span>
          </StatChip>
          <StatChip difficulty="Hard">
            <span className="dot" />
            <span>
              Hard: {stats.hardSolved}/{stats.hardTotal}
            </span>
          </StatChip>

          {activeSheet === "sysdesign" && (
            <>
              <SectionBreakdownChip>
                <span>
                  Foundations: {sysDesignStats.foundationsSolved}/{sysDesignStats.foundationsTotal}
                </span>
              </SectionBreakdownChip>
              <SectionBreakdownChip>
                <span>
                  HLD: {sysDesignStats.hldSolved}/{sysDesignStats.hldTotal}
                </span>
              </SectionBreakdownChip>
              <SectionBreakdownChip>
                <span>
                  Patterns: {sysDesignStats.patternsSolved}/{sysDesignStats.patternsTotal}
                </span>
              </SectionBreakdownChip>
              <SectionBreakdownChip>
                <span>
                  LLD: {sysDesignStats.lldSolved}/{sysDesignStats.lldTotal}
                </span>
              </SectionBreakdownChip>
            </>
          )}

          <StatChipStarred>
            <StarRounded sx={{ fontSize: 15, color: "#facc15" }} />
            <span>Starred: {stats.starredCount}</span>
          </StatChipStarred>
        </StatsChipsRow>
      </StatsCard>

      {/* Search & Filter Controls */}
      <ControlsSection>
        <SearchWrapper>
          <SearchRounded sx={{ fontSize: 20, color: "var(--text-muted)" }} />
          <SearchInput
            type="text"
            placeholder={
              activeSheet === "sysdesign"
                ? "Search topics, technology tags (Kafka, Redis, Raft, WebSockets)..."
                : activeSheet === "sql"
                  ? "Search SQL problems or topics..."
                  : "Search DSA problems or topics..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <ClearButton onClick={() => setSearchQuery("")} aria-label="Clear search">
              <ClearRounded sx={{ fontSize: 18 }} />
            </ClearButton>
          )}
        </SearchWrapper>

        {/* Filters Row */}
        <FiltersRow>
          <FilterPillsGroup>
            {(["all", "unsolved", "solved", "starred"] as const).map((filter) => (
              <FilterPill
                key={filter}
                active={statusFilter === filter}
                onClick={() => setStatusFilter(filter)}
              >
                {filter === "all"
                  ? "All Status"
                  : filter === "unsolved"
                    ? "Unsolved"
                    : filter === "solved"
                      ? "Solved"
                      : "★ Starred"}
              </FilterPill>
            ))}

            {activeSheet === "sysdesign" && (
              <>
                <FilterDivider />
                {(["all", "Foundations", "HLD", "Design Patterns", "LLD"] as const).map((sec) => (
                  <FilterPill
                    key={sec}
                    active={sysSectionFilter === sec}
                    onClick={() => setSysSectionFilter(sec)}
                  >
                    {sec === "all" ? "All Modules" : sec}
                  </FilterPill>
                ))}
              </>
            )}
          </FilterPillsGroup>

          <DifficultySelect
            value={difficultyFilter}
            onChange={(e) =>
              setDifficultyFilter(e.target.value as "all" | "Easy" | "Medium" | "Hard")
            }
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </DifficultySelect>
        </FiltersRow>

        {/* Expand / Collapse All */}
        <AccordionControlsRow>
          <MatchingCount>
            {totalMatchingProblems} topic{totalMatchingProblems !== 1 ? "s" : ""} found
          </MatchingCount>
          <AccordionToggleButtons>
            <ActionButton onClick={expandAll} aria-label="Expand all categories">
              <UnfoldMoreRounded sx={{ fontSize: 17 }} />
              <span>Expand All</span>
            </ActionButton>
            <ActionButton onClick={collapseAll} aria-label="Collapse all categories">
              <UnfoldLessRounded sx={{ fontSize: 17 }} />
              <span>Collapse All</span>
            </ActionButton>
          </AccordionToggleButtons>
        </AccordionControlsRow>
      </ControlsSection>

      {/* Empty State */}
      {totalMatchingProblems === 0 ? (
        <EmptyStateCard>
          <TerminalRounded sx={{ fontSize: 48, color: "var(--text-muted)", opacity: 0.5 }} />
          <EmptyTitle>No topics or problems found</EmptyTitle>
          <EmptyDescription>Try adjusting your search keywords or active filters.</EmptyDescription>
          <ResetFiltersButton
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setDifficultyFilter("all");
              setSysSectionFilter("all");
            }}
          >
            Reset Filters
          </ResetFiltersButton>
        </EmptyStateCard>
      ) : activeSheet === "dsa" ? (
        /* DSA Steps Accordion List */
        <StepsList>
          {filteredDsaSteps.map((step) => {
            const stepOpen = isStepOpen(step.id);
            const originalStep = striverA2ZSteps.find((s) => s.id === step.id) || step;
            const progress = getStepProgress(originalStep);

            return (
              <StepAccordionCard key={step.id}>
                <StepHeader onClick={() => toggleStep(step.id)} isExpanded={stepOpen}>
                  <StepHeaderLeft>
                    <StepNumberBadge>Step {step.stepNumber}</StepNumberBadge>
                    <StepTitleText>{step.title}</StepTitleText>
                  </StepHeaderLeft>

                  <StepHeaderRight>
                    <StepProgressTag
                      isComplete={progress.solved === progress.total && progress.total > 0}
                    >
                      {progress.solved} / {progress.total}
                    </StepProgressTag>
                    {stepOpen ? (
                      <KeyboardArrowUpRounded sx={{ fontSize: 22, color: "var(--text-muted)" }} />
                    ) : (
                      <KeyboardArrowDownRounded sx={{ fontSize: 22, color: "var(--text-muted)" }} />
                    )}
                  </StepHeaderRight>
                </StepHeader>

                {stepOpen && (
                  <StepContent>
                    {step.subTopics.map((subTopic) => {
                      const subTotal = subTopic.problems.length;
                      const subSolved = subTopic.problems.filter((p) => solvedIds.has(p.id)).length;

                      return (
                        <SubTopicSection key={subTopic.id}>
                          <SubTopicHeader>
                            <SubTopicTitle>{subTopic.title}</SubTopicTitle>
                            <SubTopicProgress>
                              {subSolved} / {subTotal}
                            </SubTopicProgress>
                          </SubTopicHeader>

                          <ProblemsTable>
                            {subTopic.problems.map((problem) => {
                              const isSolved = solvedIds.has(problem.id);
                              const isStarred = starredIds.has(problem.id);

                              return (
                                <ProblemRow key={problem.id} isSolved={isSolved}>
                                  <CheckboxButton
                                    onClick={() => handleToggleSolved(problem.id)}
                                    isSolved={isSolved}
                                    title={isSolved ? "Mark as unsolved" : "Mark as solved"}
                                    aria-label={`Mark ${problem.title} as ${isSolved ? "unsolved" : "solved"}`}
                                  >
                                    {isSolved && (
                                      <CheckRounded sx={{ fontSize: 16, color: "#ffffff" }} />
                                    )}
                                  </CheckboxButton>

                                  <ProblemTitle
                                    isSolved={isSolved}
                                    onClick={() => handleToggleSolved(problem.id)}
                                  >
                                    {problem.title}
                                  </ProblemTitle>

                                  <DifficultyBadge difficulty={problem.difficulty}>
                                    {problem.difficulty}
                                  </DifficultyBadge>

                                  <ProblemActions>
                                    <Tooltip
                                      title={
                                        isStarred ? "Remove from Starred" : "Bookmark for Revision"
                                      }
                                    >
                                      <ActionButtonSmall
                                        onClick={() => handleToggleStarred(problem.id)}
                                        aria-label="Bookmark problem"
                                      >
                                        {isStarred ? (
                                          <StarRounded sx={{ fontSize: 20, color: "#facc15" }} />
                                        ) : (
                                          <StarBorderRounded
                                            sx={{ fontSize: 20, color: "var(--text-muted)" }}
                                          />
                                        )}
                                      </ActionButtonSmall>
                                    </Tooltip>

                                    {problem.ytVideo && (
                                      <Tooltip title="Video Solution on YouTube">
                                        <ExternalLinkButton
                                          href={problem.ytVideo}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          aria-label="Watch video solution on YouTube"
                                        >
                                          <SmartDisplayRounded
                                            sx={{ fontSize: 18, color: "#ef4444" }}
                                          />
                                        </ExternalLinkButton>
                                      </Tooltip>
                                    )}

                                    {problem.leetcodeUrl && (
                                      <Tooltip title="Practice on LeetCode">
                                        <ExternalLinkButton
                                          href={problem.leetcodeUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          aria-label="Solve on LeetCode"
                                        >
                                          <LaunchRounded sx={{ fontSize: 18 }} />
                                        </ExternalLinkButton>
                                      </Tooltip>
                                    )}
                                  </ProblemActions>
                                </ProblemRow>
                              );
                            })}
                          </ProblemsTable>
                        </SubTopicSection>
                      );
                    })}
                  </StepContent>
                )}
              </StepAccordionCard>
            );
          })}
        </StepsList>
      ) : activeSheet === "sql" ? (
        /* SQL Sections Accordion List */
        <StepsList>
          {filteredSqlCategories.map((cat) => {
            const catOpen = isStepOpen(cat.id);
            const originalCat = leetcodeSqlCategories.find((c) => c.id === cat.id) || cat;
            const progress = getSqlCatProgress(originalCat);

            return (
              <StepAccordionCard key={cat.id}>
                <StepHeader onClick={() => toggleStep(cat.id)} isExpanded={catOpen}>
                  <StepHeaderLeft>
                    <StepNumberBadge>Section {cat.categoryNumber}</StepNumberBadge>
                    <StepTitleText>{cat.title}</StepTitleText>
                  </StepHeaderLeft>

                  <StepHeaderRight>
                    <StepProgressTag
                      isComplete={progress.solved === progress.total && progress.total > 0}
                    >
                      {progress.solved} / {progress.total}
                    </StepProgressTag>
                    {catOpen ? (
                      <KeyboardArrowUpRounded sx={{ fontSize: 22, color: "var(--text-muted)" }} />
                    ) : (
                      <KeyboardArrowDownRounded sx={{ fontSize: 22, color: "var(--text-muted)" }} />
                    )}
                  </StepHeaderRight>
                </StepHeader>

                {catOpen && (
                  <StepContent>
                    <ProblemsTable>
                      {cat.problems.map((problem) => {
                        const isSolved = solvedIds.has(problem.id);
                        const isStarred = starredIds.has(problem.id);

                        return (
                          <ProblemRow key={problem.id} isSolved={isSolved}>
                            <CheckboxButton
                              onClick={() => handleToggleSolved(problem.id)}
                              isSolved={isSolved}
                              title={isSolved ? "Mark as unsolved" : "Mark as solved"}
                              aria-label={`Mark ${problem.title} as ${isSolved ? "unsolved" : "solved"}`}
                            >
                              {isSolved && <CheckRounded sx={{ fontSize: 16, color: "#ffffff" }} />}
                            </CheckboxButton>

                            <ProblemTitle
                              isSolved={isSolved}
                              onClick={() => handleToggleSolved(problem.id)}
                            >
                              <span style={{ opacity: 0.6, marginRight: 6 }}>
                                #{problem.number}
                              </span>
                              {problem.title}
                            </ProblemTitle>

                            <DifficultyBadge difficulty={problem.difficulty}>
                              {problem.difficulty}
                            </DifficultyBadge>

                            <ProblemActions>
                              <Tooltip
                                title={isStarred ? "Remove from Starred" : "Bookmark for Revision"}
                              >
                                <ActionButtonSmall
                                  onClick={() => handleToggleStarred(problem.id)}
                                  aria-label="Bookmark problem"
                                >
                                  {isStarred ? (
                                    <StarRounded sx={{ fontSize: 20, color: "#facc15" }} />
                                  ) : (
                                    <StarBorderRounded
                                      sx={{ fontSize: 20, color: "var(--text-muted)" }}
                                    />
                                  )}
                                </ActionButtonSmall>
                              </Tooltip>

                              <Tooltip title="Practice on LeetCode">
                                <ExternalLinkButton
                                  href={problem.leetcodeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Solve on LeetCode"
                                >
                                  <LaunchRounded sx={{ fontSize: 18 }} />
                                </ExternalLinkButton>
                              </Tooltip>
                            </ProblemActions>
                          </ProblemRow>
                        );
                      })}
                    </ProblemsTable>
                  </StepContent>
                )}
              </StepAccordionCard>
            );
          })}
        </StepsList>
      ) : (
        /* System Design Pillars Accordion List */
        <StepsList>
          {filteredSysGroups.map((group) => {
            const groupOpen = isStepOpen(group.id);
            const originalGroup = sysPillarGroups.find((g) => g.id === group.id) || group;
            const progress = getSysGroupProgress(originalGroup);

            return (
              <StepAccordionCard key={group.id}>
                <StepHeader onClick={() => toggleStep(group.id)} isExpanded={groupOpen}>
                  <StepHeaderLeft>
                    <SysSectionBadge section={group.section}>{group.section}</SysSectionBadge>
                    <StepTitleText>{group.name}</StepTitleText>
                  </StepHeaderLeft>

                  <StepHeaderRight>
                    <StepProgressTag
                      isComplete={progress.solved === progress.total && progress.total > 0}
                    >
                      {progress.solved} / {progress.total}
                    </StepProgressTag>
                    {groupOpen ? (
                      <KeyboardArrowUpRounded sx={{ fontSize: 22, color: "var(--text-muted)" }} />
                    ) : (
                      <KeyboardArrowDownRounded sx={{ fontSize: 22, color: "var(--text-muted)" }} />
                    )}
                  </StepHeaderRight>
                </StepHeader>

                {groupOpen && (
                  <StepContent>
                    <ProblemsTable>
                      {group.problems.map((problem) => {
                        const isSolved = solvedIds.has(problem.id);
                        const isStarred = starredIds.has(problem.id);

                        return (
                          <SysProblemCard key={problem.id} isSolved={isSolved}>
                            <SysProblemMainRow>
                              <CheckboxButton
                                onClick={() => handleToggleSolved(problem.id)}
                                isSolved={isSolved}
                                title={isSolved ? "Mark as unsolved" : "Mark as solved"}
                                aria-label={`Mark ${problem.title} as ${isSolved ? "unsolved" : "solved"}`}
                              >
                                {isSolved && (
                                  <CheckRounded sx={{ fontSize: 16, color: "#ffffff" }} />
                                )}
                              </CheckboxButton>

                              <ProblemTitle
                                isSolved={isSolved}
                                onClick={() => handleToggleSolved(problem.id)}
                              >
                                <span style={{ opacity: 0.6, marginRight: 6 }}>
                                  #{problem.number}
                                </span>
                                {problem.title}
                              </ProblemTitle>

                              <DifficultyBadge difficulty={problem.difficulty}>
                                {problem.difficulty}
                              </DifficultyBadge>

                              <ProblemActions>
                                <Tooltip
                                  title={
                                    isStarred ? "Remove from Starred" : "Bookmark for Revision"
                                  }
                                >
                                  <ActionButtonSmall
                                    onClick={() => handleToggleStarred(problem.id)}
                                    aria-label="Bookmark topic"
                                  >
                                    {isStarred ? (
                                      <StarRounded sx={{ fontSize: 20, color: "#facc15" }} />
                                    ) : (
                                      <StarBorderRounded
                                        sx={{ fontSize: 20, color: "var(--text-muted)" }}
                                      />
                                    )}
                                  </ActionButtonSmall>
                                </Tooltip>

                                {problem.ytVideo && (
                                  <Tooltip title="Watch Video Breakdown">
                                    <ExternalLinkButton
                                      href={problem.ytVideo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label="Watch video solution on YouTube"
                                    >
                                      <SmartDisplayRounded
                                        sx={{ fontSize: 18, color: "#ef4444" }}
                                      />
                                    </ExternalLinkButton>
                                  </Tooltip>
                                )}

                                {problem.referenceUrl && (
                                  <Tooltip title="View Architecture Reference / Blueprint">
                                    <ExternalLinkButton
                                      href={problem.referenceUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label="View architectural reference"
                                    >
                                      <LaunchRounded sx={{ fontSize: 18 }} />
                                    </ExternalLinkButton>
                                  </Tooltip>
                                )}
                              </ProblemActions>
                            </SysProblemMainRow>

                            {/* Description & Component Tags */}
                            <SysProblemDetails>
                              <SysDescription>{problem.description}</SysDescription>
                              <ComponentTagsRow>
                                {problem.keyComponents.map((tag) => (
                                  <ComponentTag
                                    key={tag}
                                    onClick={() => setSearchQuery(tag)}
                                    title={`Filter by tag: ${tag}`}
                                  >
                                    {tag}
                                  </ComponentTag>
                                ))}
                              </ComponentTagsRow>
                            </SysProblemDetails>
                          </SysProblemCard>
                        );
                      })}
                    </ProblemsTable>
                  </StepContent>
                )}
              </StepAccordionCard>
            );
          })}
        </StepsList>
      )}
    </PageContainer>
  );
}

/* ================= Styled Components ================= */

const PageContainer = styled.main`
  --bg-card: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.05)" : "#ffffff")};
  --border-card: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0")};
  --border-divider: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#f1f5f9")};
  --text-dark: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#17243a")};
  --text-muted: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};
  --text-subtle: ${({ theme }) => (theme.darkmode ? "#cbd5e1" : "#475569")};
  --bg-input: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.06)" : "#f8fafc")};
  --hover-row: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.03)" : "#f8fafc")};

  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 8px 16px 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;

  @media (min-width: 1025px) {
    padding: 24px 32px 80px;
  }
`;

const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--text-dark);
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
`;

const HeaderBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  padding: 4px 12px;
  border-radius: 20px;
`;

const SheetSwitcherRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  background: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.04)" : "#f1f5f9")};
  padding: 5px;
  border-radius: 14px;
  border: 1px solid var(--border-card);
  overflow-x: auto;
`;

const SheetTabBtn = styled.button<{ active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  background: ${({ active, theme }) =>
    active ? (theme.darkmode ? "#7851bf" : "#ffffff") : "transparent"};
  color: ${({ active, theme }) =>
    active ? (theme.darkmode ? "#ffffff" : "#7851bf") : "var(--text-muted)"};
  box-shadow: ${({ active }) => (active ? "0 2px 10px rgba(0, 0, 0, 0.08)" : "none")};

  &:hover {
    color: ${({ active }) => (active ? "inherit" : "var(--text-dark)")};
  }
`;

const TitleSection = styled.div`
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0 0 6px 0;
  background: linear-gradient(135deg, #7851bf 0%, #3b82f6 50%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 13.5px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
`;

const StatsCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 18px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
`;

const StatsCardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

const StatsTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  margin-bottom: 4px;
`;

const StatsNumber = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: var(--text-dark);

  .dim {
    font-size: 15px;
    font-weight: 500;
    color: var(--text-muted);
  }
`;

const PercentageBadge = styled.div<{ percentage: number }>`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #7851bf 0%, #6366f1 100%);
  padding: 6px 14px;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(120, 81, 191, 0.3);
`;

const ProgressBarTrack = styled.div`
  width: 100%;
  height: 10px;
  background: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0")};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const ProgressBarFill = styled.div<{ width: number }>`
  height: 100%;
  width: ${({ width }) => Math.min(Math.max(width, 0), 100)}%;
  background: linear-gradient(90deg, #7851bf 0%, #3b82f6 50%, #10b981 100%);
  border-radius: 10px;
  transition: width 0.4s ease;
`;

const StatsChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const StatChip = styled.div<{ difficulty: "Easy" | "Medium" | "Hard" }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 10px;
  color: ${({ difficulty }) =>
    difficulty === "Easy" ? "#10b981" : difficulty === "Medium" ? "#f59e0b" : "#ef4444"};
  background: ${({ difficulty }) =>
    difficulty === "Easy"
      ? "rgba(16, 185, 129, 0.12)"
      : difficulty === "Medium"
        ? "rgba(245, 158, 11, 0.12)"
        : "rgba(239, 68, 68, 0.12)"};

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const SectionBreakdownChip = styled.div`
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 10px;
  background: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.07)" : "#f1f5f9")};
  color: var(--text-dark);
  border: 1px solid var(--border-card);
`;

const StatChipStarred = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 10px;
  color: #eab308;
  background: rgba(234, 179, 8, 0.12);
  margin-left: auto;

  @media (max-width: 540px) {
    margin-left: 0;
  }
`;

const ControlsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 0 14px;
  gap: 10px;
  height: 46px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`;

const SearchInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  color: var(--text-dark);

  &::placeholder {
    color: var(--text-muted);
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  &:hover {
    color: var(--text-dark);
  }
`;

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterPillsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const FilterDivider = styled.div`
  width: 1px;
  height: 20px;
  background: var(--border-card);
  margin: 0 4px;
`;

const FilterPill = styled.button<{ active: boolean }>`
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid
    ${({ active, theme }) =>
      active ? "#7851bf" : theme.darkmode ? "rgba(255, 255, 255, 0.12)" : "#e2e8f0"};
  background: ${({ active, theme }) =>
    active ? "#7851bf" : theme.darkmode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.02)"};
  color: ${({ active }) => (active ? "#ffffff" : "var(--text-muted)")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #7851bf;
    color: ${({ active }) => (active ? "#ffffff" : "#7851bf")};
  }
`;

const DifficultySelect = styled.select`
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 12px;
  border: 1px solid var(--border-card);
  background: var(--bg-card);
  color: var(--text-dark);
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #7851bf;
  }
`;

const AccordionControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 4px;
`;

const MatchingCount = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
`;

const AccordionToggleButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    color: var(--text-dark);
    background: var(--hover-row);
  }
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StepAccordionCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.2)" : "#cbd5e1")};
  }
`;

const StepHeader = styled.div<{ isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
  background: ${({ isExpanded, theme }) =>
    isExpanded
      ? theme.darkmode
        ? "rgba(255, 255, 255, 0.03)"
        : "rgba(120, 81, 191, 0.03)"
      : "transparent"};
  user-select: none;
  transition: background-color 0.2s;

  &:hover {
    background: var(--hover-row);
  }
`;

const StepHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
`;

const StepNumberBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 4px 9px;
  border-radius: 8px;
  background: rgba(120, 81, 191, 0.14);
  color: #7851bf;
  flex-shrink: 0;
`;

const SysSectionBadge = styled.span<{ section: "Foundations" | "HLD" | "Design Patterns" | "LLD" }>`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 4px 9px;
  border-radius: 8px;
  flex-shrink: 0;
  background: ${({ section }) =>
    section === "Foundations"
      ? "rgba(59, 130, 246, 0.15)"
      : section === "HLD"
        ? "rgba(120, 81, 191, 0.15)"
        : section === "Design Patterns"
          ? "rgba(245, 158, 11, 0.15)"
          : "rgba(16, 185, 129, 0.15)"};
  color: ${({ section }) =>
    section === "Foundations"
      ? "#3b82f6"
      : section === "HLD"
        ? "#7851bf"
        : section === "Design Patterns"
          ? "#f59e0b"
          : "#10b981"};
`;

const StepTitleText = styled.h2`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const StepHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

const StepProgressTag = styled.span<{ isComplete: boolean }>`
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  background: ${({ isComplete }) =>
    isComplete ? "rgba(16, 185, 129, 0.15)" : "rgba(0, 0, 0, 0.05)"};
  color: ${({ isComplete }) => (isComplete ? "#10b981" : "var(--text-muted)")};
`;

const StepContent = styled.div`
  border-top: 1px solid var(--border-divider);
  padding: 12px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SubTopicSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SubTopicHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 6px;
`;

const SubTopicTitle = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-subtle);
  margin: 0;
  text-transform: capitalize;
`;

const SubTopicProgress = styled.span`
  font-size: 11.5px;
  font-weight: 500;
  color: var(--text-muted);
`;

const ProblemsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProblemRow = styled.div<{ isSolved: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: ${({ isSolved, theme }) =>
    isSolved
      ? theme.darkmode
        ? "rgba(255, 255, 255, 0.02)"
        : "rgba(0, 0, 0, 0.01)"
      : "transparent"};
  border: 1px solid
    ${({ isSolved, theme }) =>
      isSolved
        ? theme.darkmode
          ? "rgba(255, 255, 255, 0.04)"
          : "#f1f5f9"
        : theme.darkmode
          ? "rgba(255, 255, 255, 0.06)"
          : "#f1f5f9"};
  transition: all 0.15s ease;

  &:hover {
    background: var(--hover-row);
  }
`;

const SysProblemCard = styled.div<{ isSolved: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 12px;
  background: ${({ isSolved, theme }) =>
    isSolved
      ? theme.darkmode
        ? "rgba(255, 255, 255, 0.02)"
        : "rgba(0, 0, 0, 0.01)"
      : "transparent"};
  border: 1px solid
    ${({ isSolved, theme }) =>
      isSolved
        ? theme.darkmode
          ? "rgba(255, 255, 255, 0.04)"
          : "#f1f5f9"
        : theme.darkmode
          ? "rgba(255, 255, 255, 0.06)"
          : "#f1f5f9"};
  transition: all 0.15s ease;

  &:hover {
    background: var(--hover-row);
  }
`;

const SysProblemMainRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SysProblemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 34px;
`;

const SysDescription = styled.p`
  font-size: 12.5px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.45;
`;

const ComponentTagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const ComponentTag = styled.button`
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 6px;
  background: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.06)" : "#f1f5f9")};
  color: var(--text-subtle);
  border: 1px solid var(--border-card);
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: rgba(120, 81, 191, 0.1);
    color: #7851bf;
    border-color: rgba(120, 81, 191, 0.3);
  }
`;

const CheckboxButton = styled.button<{ isSolved: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 7px;
  border: 1.5px solid ${({ isSolved }) => (isSolved ? "#10b981" : "var(--text-muted)")};
  background: ${({ isSolved }) => (isSolved ? "#10b981" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: all 0.2s;

  &:hover {
    border-color: #10b981;
    transform: scale(1.05);
  }
`;

const ProblemTitle = styled.div<{ isSolved: boolean }>`
  flex: 1;
  font-size: 13.5px;
  font-weight: 500;
  color: ${({ isSolved }) => (isSolved ? "var(--text-muted)" : "var(--text-dark)")};
  text-decoration: ${({ isSolved }) => (isSolved ? "line-through" : "none")};
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.4;

  &:hover {
    color: #7851bf;
  }
`;

const DifficultyBadge = styled.span<{ difficulty: "Easy" | "Medium" | "Hard" }>`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 8px;
  flex-shrink: 0;
  color: ${({ difficulty }) =>
    difficulty === "Easy" ? "#10b981" : difficulty === "Medium" ? "#f59e0b" : "#ef4444"};
  background: ${({ difficulty }) =>
    difficulty === "Easy"
      ? "rgba(16, 185, 129, 0.12)"
      : difficulty === "Medium"
        ? "rgba(245, 158, 11, 0.12)"
        : "rgba(239, 68, 68, 0.12)"};
`;

const ProblemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

const ActionButtonSmall = styled.button`
  background: none;
  border: none;
  padding: 5px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: var(--hover-row);
    transform: scale(1.1);
  }
`;

const ExternalLinkButton = styled.a`
  color: var(--text-muted);
  padding: 5px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    color: #7851bf;
    background: var(--hover-row);
    transform: scale(1.1);
  }
`;

const EmptyStateCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 18px;
  text-align: center;
  gap: 12px;
`;

const EmptyTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0;
`;

const EmptyDescription = styled.p`
  font-size: 13.5px;
  color: var(--text-muted);
  margin: 0 0 8px 0;
  max-width: 320px;
`;

const ResetFiltersButton = styled.button`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  background: #7851bf;
  border: none;
  border-radius: 12px;
  padding: 8px 18px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
