import { z } from 'zod';

// User Types
export const UserRoleSchema = z.enum(['admin', 'organizer', 'scorer', 'fan']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: UserRoleSchema,
  avatar: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof UserSchema>;

// Tournament Types
export const TournamentStatusSchema = z.enum(['upcoming', 'ongoing', 'completed']);
export type TournamentStatus = z.infer<typeof TournamentStatusSchema>;

export const TournamentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  status: TournamentStatusSchema,
  organizerId: z.string(),
  teams: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Tournament = z.infer<typeof TournamentSchema>;

// Match Types
export const MatchStatusSchema = z.enum(['scheduled', 'live', 'completed', 'cancelled']);
export type MatchStatus = z.infer<typeof MatchStatusSchema>;

export const MatchSchema = z.object({
  id: z.string(),
  tournamentId: z.string(),
  team1: z.string(),
  team2: z.string(),
  venue: z.string(),
  scheduledDate: z.string(),
  status: MatchStatusSchema,
  currentInnings: z.number().optional(),
  currentOver: z.number().optional(),
  currentBall: z.number().optional(),
  team1Score: z.number().default(0),
  team1Wickets: z.number().default(0),
  team1Overs: z.number().default(0),
  team2Score: z.number().default(0),
  team2Wickets: z.number().default(0),
  team2Overs: z.number().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Match = z.infer<typeof MatchSchema>;

// Ball Event Types
export const BallEventTypeSchema = z.enum([
  'dot',
  'single',
  'double',
  'triple',
  'four',
  'six',
  'wide',
  'no-ball',
  'wicket',
  'bye',
  'leg-bye',
]);

export type BallEventType = z.infer<typeof BallEventTypeSchema>;

export const WicketTypeSchema = z.enum([
  'bowled',
  'caught',
  'lbw',
  'run-out',
  'stumped',
  'hit-wicket',
  'obstructing-field',
  'timed-out',
  'retired-out',
]);

export type WicketType = z.infer<typeof WicketTypeSchema>;

export const BallEventSchema = z.object({
  id: z.string(),
  matchId: z.string(),
  innings: z.number(),
  over: z.number(),
  ball: z.number(),
  eventType: BallEventTypeSchema,
  runs: z.number(),
  extras: z.number().default(0),
  wicketType: WicketTypeSchema.optional(),
  batsmanId: z.string().optional(),
  bowlerId: z.string().optional(),
  fielderId: z.string().optional(),
  commentary: z.string().optional(),
  timestamp: z.string(),
});

export type BallEvent = z.infer<typeof BallEventSchema>;

// API Response Types
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
});

export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

// Auth Types
export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
  refreshToken: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// WebSocket Event Types
export const WebSocketEventSchema = z.object({
  type: z.enum(['match_update', 'ball_event', 'user_joined', 'user_left']),
  data: z.any(),
  timestamp: z.string(),
});

export type WebSocketEvent = z.infer<typeof WebSocketEventSchema>; 