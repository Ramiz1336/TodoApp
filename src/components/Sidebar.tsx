import { keyframes, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  AccessTimeFilledRounded,
  AddRounded,
  AutoAwesomeRounded,
  CategoryRounded,
  CloseRounded,
  DeleteForeverRounded,
  DownloadDoneRounded,
  EventRepeatRounded,
  Favorite,
  FiberManualRecord,
  GetAppRounded,
  InstallDesktopRounded,
  InstallMobileRounded,
  Logout,
  PhoneIphoneRounded,
  PhonelinkRounded,
  QueryStatsRounded,
  SettingsRounded,
  AccountTreeRounded,
  StorageRounded,
  TaskAltRounded,
  TerminalRounded,
  ThumbUpRounded,
} from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  MenuItem,
  SwipeableDrawer,
  Tooltip,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CustomDialogTitle, LogoutDialog, SettingsDialog } from ".";
import { defaultUser } from "../constants/defaultUser";
import { UserContext } from "../contexts/UserContext";
import { usePWAInstall } from "../hooks/usePWAInstall";
import { DialogBtn, UserAvatar, pulseAnimation, reduceMotion } from "../styles";
import {
  getProfilePictureFromDB,
  shortRelativeTime,
  showToast,
  systemInfo,
  timeAgo,
} from "../utils";
import { getDsaStats } from "../data/striverA2ZData";
import { getSqlStats } from "../data/leetcodeSqlData";
import { getSystemDesignStats } from "../data/systemDesignData";

export const ProfileSidebar = () => {
  const { user, setUser } = useContext(UserContext);
  const { name, profilePicture, tasks, settings } = user;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const theme = useTheme();
  const n = useNavigate();
  const location = useLocation();

  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadProfilePicture = async () => {
      const picture = await getProfilePictureFromDB(profilePicture);
      setAvatarSrc(picture);
    };
    loadProfilePicture();
  }, [profilePicture]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { isAppInstalled, isPWAEligible, promptInstall } = usePWAInstall();
  const [openInstalledDialog, setOpenInstalledDialog] = useState<boolean>(false);

  const handleInstallClick = () => {
    promptInstall(() => {
      if (systemInfo.os === "Windows") {
        setOpenInstalledDialog(true);
      } else {
        showToast("App installed successfully!");
      }
      handleClose();
    });
  };

  const pendingTasksCount = tasks.filter((task) => !task.done).length;
  const trackedHabitsCount = tasks.filter((t) => t.tracked && t.recurrence === "daily").length;
  const performanceCount = user.performanceRecords?.length ?? 0;
  const dsaStats = getDsaStats(
    user.dsaProgress?.solvedProblemIds,
    user.dsaProgress?.starredProblemIds,
  );
  const sqlStats = getSqlStats(
    user.dsaProgress?.solvedProblemIds,
    user.dsaProgress?.starredProblemIds,
  );
  const sysDesignStats = getSystemDesignStats(
    user.dsaProgress?.solvedProblemIds,
    user.dsaProgress?.starredProblemIds,
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <Container>
      <Tooltip title={<div translate={name ? "no" : "yes"}>{name || "User"}</div>}>
        <IconButton
          aria-label="Sidebar"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ zIndex: 1 }}
        >
          <UserAvatar
            src={avatarSrc || undefined}
            alt={name || "User"}
            hasimage={profilePicture !== null}
            pulse={
              user.name === defaultUser.name &&
              user.profilePicture === defaultUser.profilePicture &&
              JSON.stringify(user.settings) === JSON.stringify(defaultUser.settings)
            }
            size="52px"
            onError={() => {
              if (!navigator.onLine) return;
              setUser((prevUser) => ({
                ...prevUser,
                profilePicture: null,
              }));
              showToast("Error in profile picture URL", { type: "error" });
            }}
          >
            {name ? name[0].toUpperCase() : undefined}
          </UserAvatar>
        </IconButton>
      </Tooltip>

      <StyledSwipeableDrawer
        disableBackdropTransition={systemInfo.os !== "iOS"}
        disableDiscovery={systemInfo.os === "iOS"}
        id="basic-menu"
        anchor="right"
        open={open}
        onOpen={(e) => e.preventDefault()}
        onClose={handleClose}
      >
        <SidebarHeader>
          <LogoContainer
            translate="no"
            onClick={() => {
              n("/");
              handleClose();
            }}
          >
            <Logo src="/logo.svg" alt="logo" />
            <LogoText>
              <span>Todo</span> App
            </LogoText>
          </LogoContainer>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              color: theme.darkmode ? "#94a3b8" : "#64748b",
              "&:hover": { color: theme.darkmode ? "#f8fafc" : "#0f172a" },
            }}
          >
            <CloseRounded fontSize="small" />
          </IconButton>
        </SidebarHeader>

        <DrawerBody>
          {/* Main Navigation Section */}
          <SectionLabel>Navigation</SectionLabel>

          <MenuLink to="/">
            <StyledMenuItem active={isActive("/")} onClick={handleClose}>
              <TaskAltRounded />
              <span>Tasks</span>
              {pendingTasksCount > 0 && (
                <Tooltip
                  title={`${pendingTasksCount} pending task${pendingTasksCount !== 1 ? "s" : ""}`}
                >
                  <MenuLabel active={isActive("/")}>{pendingTasksCount}</MenuLabel>
                </Tooltip>
              )}
            </StyledMenuItem>
          </MenuLink>

          <MenuLink to="/tracked">
            <StyledMenuItem active={isActive("/tracked")} onClick={handleClose}>
              <EventRepeatRounded />
              <span>Tracked</span>
              {trackedHabitsCount > 0 && (
                <Tooltip
                  title={`${trackedHabitsCount} active habit${trackedHabitsCount !== 1 ? "s" : ""}`}
                >
                  <MenuLabel active={isActive("/tracked")}>{trackedHabitsCount}</MenuLabel>
                </Tooltip>
              )}
            </StyledMenuItem>
          </MenuLink>

          <MenuLink to="/performance">
            <StyledMenuItem active={isActive("/performance")} onClick={handleClose}>
              <QueryStatsRounded />
              <span>Performance</span>
              {performanceCount > 0 && (
                <Tooltip title={`${performanceCount} completions recorded`}>
                  <MenuLabel active={isActive("/performance")}>{performanceCount}</MenuLabel>
                </Tooltip>
              )}
            </StyledMenuItem>
          </MenuLink>

          <MenuLink to="/dsa">
            <StyledMenuItem
              active={
                isActive("/dsa") &&
                !location.search.includes("sheet=sql") &&
                !location.search.includes("sheet=sysdesign")
              }
              onClick={handleClose}
            >
              <TerminalRounded />
              <span>A2Z DSA Sheet</span>
              {dsaStats.solved > 0 && (
                <Tooltip
                  title={`${dsaStats.solved} of ${dsaStats.total} problems solved in A2Z Sheet (${dsaStats.percentage}%)`}
                >
                  <MenuLabel
                    active={
                      isActive("/dsa") &&
                      !location.search.includes("sheet=sql") &&
                      !location.search.includes("sheet=sysdesign")
                    }
                  >
                    {dsaStats.solved}/{dsaStats.total}
                  </MenuLabel>
                </Tooltip>
              )}
            </StyledMenuItem>
          </MenuLink>

          <MenuLink to="/dsa?sheet=sql">
            <StyledMenuItem
              active={isActive("/dsa") && location.search.includes("sheet=sql")}
              onClick={handleClose}
            >
              <StorageRounded />
              <span>LeetCode SQL</span>
              {sqlStats.solved > 0 && (
                <Tooltip
                  title={`${sqlStats.solved} of ${sqlStats.total} SQL problems solved (${sqlStats.percentage}%)`}
                >
                  <MenuLabel active={isActive("/dsa") && location.search.includes("sheet=sql")}>
                    {sqlStats.solved}/{sqlStats.total}
                  </MenuLabel>
                </Tooltip>
              )}
            </StyledMenuItem>
          </MenuLink>

          <MenuLink to="/dsa?sheet=sysdesign">
            <StyledMenuItem
              active={isActive("/dsa") && location.search.includes("sheet=sysdesign")}
              onClick={handleClose}
            >
              <AccountTreeRounded />
              <span>System Design</span>
              {sysDesignStats.solved > 0 && (
                <Tooltip
                  title={`${sysDesignStats.solved} of ${sysDesignStats.total} System Design topics solved (${sysDesignStats.percentage}%)`}
                >
                  <MenuLabel
                    active={isActive("/dsa") && location.search.includes("sheet=sysdesign")}
                  >
                    {sysDesignStats.solved}/{sysDesignStats.total}
                  </MenuLabel>
                </Tooltip>
              )}
            </StyledMenuItem>
          </MenuLink>

          <MenuLink to="/add">
            <StyledMenuItem active={isActive("/add")} onClick={handleClose}>
              <AddRounded />
              <span>Add Task</span>
            </StyledMenuItem>
          </MenuLink>

          {settings.enableCategories !== undefined && settings.enableCategories && (
            <MenuLink to="/categories">
              <StyledMenuItem active={isActive("/categories")} onClick={handleClose}>
                <CategoryRounded />
                <span>Categories</span>
              </StyledMenuItem>
            </MenuLink>
          )}

          {/* Data & Management Section */}
          <SectionLabel style={{ marginTop: "12px" }}>Data & Sync</SectionLabel>

          <MenuLink to="/transfer">
            <StyledMenuItem active={isActive("/transfer")} onClick={handleClose}>
              <GetAppRounded />
              <span>Transfer</span>
            </StyledMenuItem>
          </MenuLink>

          <MenuLink to="/sync">
            <StyledMenuItem active={isActive("/sync")} onClick={handleClose}>
              <PhonelinkRounded />
              <span>Sync Devices</span>
              {user.lastSyncedAt && (
                <Tooltip title={`Last synced ${timeAgo(new Date(user.lastSyncedAt))}`}>
                  <MenuLabel active={isActive("/sync")}>
                    <span>
                      <AccessTimeFilledRounded style={{ fontSize: "14px" }} />
                      {shortRelativeTime(new Date(user.lastSyncedAt))}
                    </span>
                  </MenuLabel>
                </Tooltip>
              )}
            </StyledMenuItem>
          </MenuLink>

          <MenuLink to="/purge">
            <StyledMenuItem active={isActive("/purge")} onClick={handleClose}>
              <DeleteForeverRounded />
              <span>Purge Tasks</span>
            </StyledMenuItem>
          </MenuLink>

          {/* Install App Section (if eligible and not already running as installed PWA) */}
          {isPWAEligible && !isAppInstalled && (
            <>
              <SectionLabel style={{ marginTop: "12px" }}>App</SectionLabel>
              <StyledMenuItem tabIndex={0} onClick={handleInstallClick}>
                {systemInfo.os === "Android" ? (
                  <InstallMobileRounded />
                ) : systemInfo.os === "iOS" ? (
                  <PhoneIphoneRounded />
                ) : (
                  <InstallDesktopRounded className="InstallDesktopRoundedIcon" />
                )}
                <span>Install App</span>
              </StyledMenuItem>
            </>
          )}

          {/* Reports & AI Export */}
          <SectionLabel style={{ marginTop: "12px" }}>Reports</SectionLabel>
          <MenuLink to="/export">
            <StyledMenuItem active={isActive("/export")} onClick={handleClose}>
              <AutoAwesomeRounded />
              <span>Export Report</span>
              <MenuLabel clr="#a855f7">
                <span>AI</span>
              </MenuLabel>
            </StyledMenuItem>
          </MenuLink>
        </DrawerBody>

        <ProfileOptionsBottom>
          <SettingsCard
            onClick={() => {
              setOpenSettings(true);
              handleClose();
            }}
          >
            <SettingsRounded className="SettingsRoundedIcon" />
            <span>Settings</span>
          </SettingsCard>

          <MenuLink to="/user">
            <ProfileCard onClick={handleClose}>
              <UserAvatar
                src={avatarSrc || undefined}
                alt={name || "User"}
                hasimage={profilePicture !== null}
                size="40px"
              >
                {name ? name[0].toUpperCase() : undefined}
              </UserAvatar>
              <ProfileMeta>
                <ProfileName>{name || "User"}</ProfileName>
                <ProfileSubtitle>View profile & stats</ProfileSubtitle>
              </ProfileMeta>
              {(name === null || name === "") && profilePicture === null && <PulseMenuLabel />}
            </ProfileCard>
          </MenuLink>

          <LogoutRow
            tabIndex={0}
            onClick={() => {
              handleClose();
              setOpenLogoutDialog(true);
            }}
          >
            <Logout className="LogoutIcon" sx={{ fontSize: 19 }} />
            <span>Log out</span>
          </LogoutRow>

          <CreditsContainer translate="no">
            <span style={{ display: "flex", alignItems: "center" }}>
              Made with &nbsp;
              <Favorite sx={{ fontSize: "13px", color: theme.primary || "#7851bf" }} />
            </span>
          </CreditsContainer>
        </ProfileOptionsBottom>
      </StyledSwipeableDrawer>

      <Dialog open={openInstalledDialog} onClose={() => setOpenInstalledDialog(false)}>
        <CustomDialogTitle
          title="App installed successfully!"
          subTitle="The app is now running as a PWA."
          icon={<DownloadDoneRounded />}
          onClose={() => setOpenInstalledDialog(false)}
        />
        <DialogContent>
          You can access it from your home screen, with offline support and features like shortcuts
          and badges.
        </DialogContent>
        <DialogActions>
          <DialogBtn onClick={() => setOpenInstalledDialog(false)}>
            <ThumbUpRounded /> &nbsp; Got it
          </DialogBtn>
        </DialogActions>
      </Dialog>
      <LogoutDialog open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)} />
      <SettingsDialog
        open={openSettings}
        onClose={() => setOpenSettings(false)}
        handleOpen={() => setOpenSettings(true)}
      />
    </Container>
  );
};

const MenuLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const styles: React.CSSProperties = { borderRadius: "14px", textDecoration: "none" };
  if (to.startsWith("/") || to === "") {
    return (
      <Link to={to} style={styles}>
        {children}
      </Link>
    );
  }
  return (
    <a href={to} target="_blank" rel="noopener noreferrer" style={styles}>
      {children}
    </a>
  );
};

const PulseMenuLabel = () => {
  return (
    <StyledPulseMenuLabel clr="#2483e2">
      <FiberManualRecord style={{ fontSize: "16px" }} />
    </StyledPulseMenuLabel>
  );
};

// Animations
const LogoutAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(45deg); }
`;

const InstallAppAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
`;

// Styled components
const Container = styled.div`
  position: absolute;
  right: 16px;
  top: 14px;
  z-index: 99;

  @media (min-width: 1025px) {
    right: calc((100vw - 620px) / 2 + 28px);
    top: 50px;
  }
`;

const StyledSwipeableDrawer = styled(SwipeableDrawer)`
  & .MuiPaper-root {
    border-radius: 28px 0 0 28px;
    background-color: ${({ theme }) => (theme.darkmode ? "#0f172a" : "#ffffff")};
    color: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#1e293b")};
    padding: 20px 18px 24px;
    width: 310px;
    display: flex;
    flex-direction: column;
    box-shadow: ${({ theme }) =>
      theme.darkmode ? "-10px 0 40px rgba(0, 0, 0, 0.6)" : "-10px 0 40px rgba(71, 85, 105, 0.15)"};
    border-left: 1px solid
      ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid
    ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#f1f5f9")};
`;

const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 2px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => (theme.darkmode ? "#334155" : "#cbd5e1")};
    border-radius: 4px;
  }
`;

const SectionLabel = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${({ theme }) => (theme.darkmode ? "#64748b" : "#94a3b8")};
  padding: 8px 12px 4px;
`;

const StyledMenuItem = styled(MenuItem)<{ active?: boolean }>`
  font-family: "Poppins", sans-serif;
  margin: 2px 0;
  padding: 10px 14px;
  border-radius: 14px;
  background-color: ${({ active, theme }) =>
    active ? (theme.primary || "#7851bf") + "18" : "transparent"};
  font-weight: ${({ active }) => (active ? 700 : 500)};
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s ease;
  color: ${({ active, theme }) =>
    active ? theme.primary || "#7851bf" : theme.darkmode ? "#f8fafc" : "#1e293b"} !important;

  & svg {
    font-size: 21px;
    color: ${({ active, theme }) => (active ? theme.primary || "#7851bf" : "inherit")};
    transition:
      0.3s transform,
      0.2s color;
  }

  &:hover {
    background-color: ${({ active, theme }) =>
      active
        ? (theme.primary || "#7851bf") + "24"
        : theme.darkmode
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(0, 0, 0, 0.04)"};

    & svg.InstallDesktopRoundedIcon {
      animation: ${InstallAppAnimation} 0.8s ease-in alternate;
    }
  }

  &,
  & svg {
    ${({ theme }) => reduceMotion(theme, { transform: "none !important" })}
  }
`;

const MenuLabel = styled.span<{ clr?: string; active?: boolean }>`
  margin-left: auto;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  background: ${({ clr, active, theme }) =>
    clr ? clr + "30" : active ? theme.primary || "#7851bf" : (theme.primary || "#7851bf") + "20"};
  color: ${({ clr, active, theme }) =>
    clr ? clr : active ? "#ffffff" : theme.primary || "#7851bf"};
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;

  & span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const StyledPulseMenuLabel = styled(MenuLabel)`
  animation: ${({ theme }) => pulseAnimation(theme.primary, 6)} 1.2s infinite;
  padding: 5px;
  margin-right: 4px;
  ${({ theme }) => reduceMotion(theme)}
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 10px;
`;

const LogoText = styled.h2`
  margin: 0;
  font-family: "Poppins", sans-serif;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.3px;
  color: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#0f172a")};

  & span {
    color: ${({ theme }) => theme.primary || "#7851bf"};
  }
`;

const ProfileOptionsBottom = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#f1f5f9")};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SettingsCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 14px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme.darkmode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.02)"};
  border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};
  color: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#1e293b")};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)"};
    & svg.SettingsRoundedIcon {
      transform: rotate(90deg);
    }
  }

  & svg.SettingsRoundedIcon {
    transition: transform 0.3s ease;
    font-size: 20px;
  }
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 16px;
  background-color: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.04)" : "#f8fafc")};
  border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#f1f5f9")};
  }
`;

const ProfileMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
  flex: 1;
`;

const ProfileName = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#0f172a")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProfileSubtitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};
`;

const LogoutRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 12px;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: #ef4444;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(239, 68, 68, 0.08);
    & svg.LogoutIcon {
      animation: ${LogoutAnimation} 0.5s ease-in alternate;
    }
  }
`;

const CreditsContainer = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 11.5px;
  margin: 0;
  opacity: 0.75;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};

  & span {
    backdrop-filter: none !important;
  }
`;
