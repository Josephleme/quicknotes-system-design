# QuickNotes System Relational Data Model Architecture

## Entity Schema Specifications

### users
- Columns: user_id (INT, PK), username (VARCHAR), email (VARCHAR, UNIQUE), password_hash (VARCHAR), created_at (TIMESTAMP)
- Key Constraints: user_id is the primary automated increment identification index.

### notes
- Columns: note_id (INT, PK), user_id (INT, FK), title (VARCHAR), body (TEXT), created_at (TIMESTAMP), updated_at (TIMESTAMP)
- Key Constraints: note_id serves as the primary index; user_id maps reference linkages onto the target parent user key.

### tags
- Columns: tag_id (INT, PK), tag_name (VARCHAR, UNIQUE), created_at (TIMESTAMP)
- Key Constraints: tag_id functions as the unique primary locator block identifier.

### note_tags
- Columns: note_id (INT, FK), tag_id (INT, FK)
- Key Constraints: Uses a combined primary constraint structural assignment mapping (note_id, tag_id) cleanly across data blocks.

## Relationship Topology

- Users to Notes: This is a distinct one-to-many relationship mapping format. An isolated individual user account can register numerous note entries over time, but every single note belongs exclusively to one explicit user profile index.
- Notes to Tags: This constitutes a distinct many-to-many relationship profile layout. A single note can contain multiple custom tagging elements assigned simultaneously, and an single tag context string can encompass hundreds of separate user notes. Relational layout rules cannot record complex arrays natively inside a standard data cell without causing anomalies. A dedicated lookup join table (note_tags) is deployed to split the complex cross-grid setup into two manageable one-to-many foreign key links.

## Table Initializations (DDL Script)

```sql
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
    note_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE tags (
    tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag_name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE note_tags (
    note_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(note_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);
```

## Sample System Query Implementations

### 1. Fetch All Notes Linked to an Explicit Tag Name (JOIN)
```sql
SELECT n.note_id, n.title, n.body 
FROM notes n
JOIN note_tags nt ON n.note_id = nt.note_id
JOIN tags t ON nt.tag_id = t.tag_id
WHERE t.tag_name = 'Engineering' AND n.user_id = 102;
```

### 2. Count Total Notes per User Record
```sql
SELECT user_id, COUNT(note_id) AS total_notes 
FROM notes 
GROUP BY user_id;
```

### 3. Wipe Out Old Data Context Rows
```sql
DELETE FROM notes 
WHERE created_at < '2025-01-01 00:00:00';
```

## Optimization Strategy

### Proposed Index Assignment
- Target Statement: CREATE INDEX idx_notes_user_time ON notes(user_id, created_at DESC);
- Justification: Users check their timeline frequently, forcing the application server to pull records ordered by recent timestamps. Creating a composite structural index prevents heavy, full-table scans by sorting the records inside storage beforehand, making timeline loading lightning fast.

## Architectural Decision Framework

A relational SQL engine architecture represents the ideal design direction for the scaled QuickNotes workspace database layer. The operational scope requires rigid enforcement of data safety consistency models, strict transaction structures, and reliable deletion cascades that wipe out linked data loops automatically if a primary profile gets terminated. Utilizing structured SQL rules ensures notes can never refer to deleted user tags, and guarantees strict constraint compliance across matching indexing values.
