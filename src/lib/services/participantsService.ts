import { mockParticipant, mockParticipants, type Participant } from "../../data/participants";
import { mockTeam, mockTeams, type Team } from "../../data/teams";
import { mockAnnouncements, type Announcement } from "../../data/announcements";

// TODO: Replace all of the below with Supabase queries against
// `participants`, `teams`, and `announcements` tables.

export const participantsService = {
  async me(): Promise<Participant> {
    return mockParticipant;
  },
  async list(): Promise<Participant[]> {
    return mockParticipants;
  },
};

export const teamsService = {
  async myTeam(): Promise<Team> {
    return mockTeam;
  },
  async list(): Promise<Team[]> {
    return mockTeams;
  },
};

export const announcementsService = {
  async list(): Promise<Announcement[]> {
    return mockAnnouncements;
  },
};
