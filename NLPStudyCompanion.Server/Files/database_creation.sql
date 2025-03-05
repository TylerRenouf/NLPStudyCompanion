-- Script Date: 16/01/2025 1:57 AM  - ErikEJ.SqlCeScripting version 3.5.2.95

-- Decks table script
CREATE TABLE [Decks] (
  [id] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  [name] TEXT NOT NULL,
  CONSTRAINT [UQ_Decks_Name] UNIQUE ([name])
);

-- Cards table script
CREATE TABLE [Cards] (
  [deck_id] INTEGER,
  [id] INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT,
  [concept] TEXT NOT NULL,
  [content] TEXT NOT NULL,
  CONSTRAINT [FK_Cards] FOREIGN KEY ([deck_id]) REFERENCES Decks([id]) ON DELETE CASCADE
);

-- Add index on deck_id for faster lookups
CREATE INDEX idx_cards_deck_id ON Cards(deck_id);
