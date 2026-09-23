Cognexus Roadmap

Project Status

Project: Cognexus
Implementation: Rebuild From Zero
Architecture: Locked
Roadmap: Locked
Current Phase: Phase 0

---

Phase 0 — Architecture Lock

Status: IN PROGRESS

Tujuan:
Memastikan fondasi desain Cognexus jelas sebelum implementasi.

Checklist:

- [x] Define system purpose
- [x] Define architecture layers
- [x] Define Knowledge model
- [x] Define Capture
- [x] Define Relationship
- [x] Define Graph
- [x] Define Markdown source of truth
- [x] Define Sync Engine
- [x] Define Query Engine
- [x] Define Context Engine
- [x] Define AI boundary
- [x] Define Memory
- [x] Define Tool System
- [x] Define Agent Engine
- [x] Define implementation order
- [ ] Finalize Decision Log

Output:

ARCHITECTURE.md
ROADMAP.md
DECISIONS.md

---

Phase 1 — Foundation

Status: PLANNED

Tujuan:
Membuat struktur aplikasi minimum tanpa fitur knowledge.

Target:

src/
├── domain/
├── application/
├── infrastructure/
└── ui/

Implementasi:

- application entry point
- module structure
- basic configuration
- error handling dasar
- utility dasar
- UI bootstrap
- development logging

Aturan:

Tidak membuat fitur besar pada phase ini.

Hasil akhir:

Cognexus dapat dijalankan
dan struktur layer sudah bekerja.

---

Phase 2 — Domain Model

Status: PLANNED

Tujuan:
Membangun objek inti Cognexus tanpa bergantung pada database.

Implementasi:

- Knowledge Entity
- Capture
- Relationship
- Knowledge Candidate
- Context
- Memory
- Agent State
- Sync State

Validasi:

- object structure
- required fields
- identity
- status
- epistemic status
- relationship identity

Hasil akhir:

Domain dapat membuat dan memvalidasi
objek Cognexus tanpa IndexedDB.

---

Phase 3 — Runtime Storage

Status: PLANNED

Tujuan:
Membangun IndexedDB sebagai runtime storage.

Implementasi:

- database initialization
- object stores
- indexes
- CRUD
- transactions
- error handling

Storage awal:

knowledge
captures
relationships
candidates
memory
sync_state

Aturan:

Domain tidak boleh mengetahui detail IndexedDB.

Hasil akhir:

Domain
   ↓
Storage API
   ↓
IndexedDB

---

Phase 4 — Markdown Storage

Status: PLANNED

Tujuan:
Membangun representasi Markdown sebagai source of truth.

Implementasi:

- Markdown serializer
- Markdown parser
- frontmatter parser
- file path resolver
- validation
- entity → Markdown
- Markdown → entity

Struktur:

knowledge/
├── concepts/
├── tools/
├── workflows/
├── lessons/
└── projects/

captures/

Hasil akhir:

Knowledge Entity
      ↕
Markdown

---

Phase 5 — Sync Engine

Status: PLANNED

Tujuan:
Menyinkronkan Markdown dengan IndexedDB secara aman.

Pipeline:

Scanner
 ↓
Parser
 ↓
Validator
 ↓
Change Detector
 ↓
Conflict Detector
 ↓
Sync Engine
 ↓
IndexedDB

Implementasi:

- sync state
- content hash
- NEW detection
- CHANGED detection
- UNCHANGED detection
- DELETED detection
- validation
- conflict detection
- transaction
- sync result

Aturan:

- invalid data tidak boleh overwrite valid data
- tidak menggunakan blind last-write-wins
- tidak ada concurrent sync

Hasil akhir:

Markdown ↔ IndexedDB

---

Phase 6 — Knowledge Graph

Status: PLANNED

Tujuan:
Membangun relationship dan traversal graph.

Implementasi:

- relationship CRUD
- unique edge
- relationship indexes
- neighbor lookup
- one-hop expansion
- cycle protection
- deleted node handling
- unresolved target handling

Traversal awal:

maxDepth = 1

Hasil akhir:

Knowledge
   ↓
Relationships
   ↓
Related Knowledge

---

Phase 7 — Query Engine

Status: PLANNED

Tujuan:
Membuat sistem pencarian deterministic.

Implementasi:

- query normalization
- text matching
- title matching
- tag matching
- content matching
- deterministic ranking
- result limits
- primary result
- related result

Ranking awal:

Exact title      +3
Title contains   +2
Tag              +2
Content          +1

Hasil akhir:

Query → Relevant Knowledge

---

Phase 8 — Context Engine

Status: PLANNED

Tujuan:
Mengubah hasil pencarian menjadi context yang dapat digunakan AI.

Pipeline:

Query
 ↓
Query Engine
 ↓
Primary
 ↓
Graph Expansion
 ↓
Related
 ↓
Context

Implementasi:

- context builder
- source tracking
- provenance
- epistemic status
- max items
- max characters

Hasil akhir:

Query → Structured Context

---

Phase 9 — Knowledge Processing

Status: PLANNED

Tujuan:
Mengubah Capture menjadi Knowledge Candidate.

Pipeline:

Capture
 ↓
Processing
 ↓
Candidate
 ↓
Validation
 ↓
Confirmation
 ↓
Knowledge

Implementasi:

- capture classification
- candidate generation
- title proposal
- content structuring
- relationship proposal
- validation
- candidate status

AI dapat digunakan sebagai processor.

Namun:

AI Proposal ≠ Trusted Knowledge

---

Phase 10 — AI Integration

Status: PLANNED

Tujuan:
Menghubungkan Cognexus dengan LLM.

Implementasi:

- LLM provider interface
- provider adapter
- prompt builder
- context injection
- response parser
- proposed action
- permission boundary

Aturan:

AI tidak boleh langsung menulis ke storage.

Pipeline:

AI
 ↓
Proposed Action
 ↓
Validator
 ↓
Permission
 ↓
Application API
 ↓
Domain
 ↓
Storage

Hasil akhir:

Cognexus dapat menggunakan AI
tanpa memberikan AI akses langsung
ke sistem internal.

---

Phase 11 — Memory

Status: PLANNED

Tujuan:
Membangun memory yang berbeda dari Knowledge.

Kategori:

Preference
Decision
Goal
Project State
User Context

Pipeline:

Conversation
 ↓
Memory Candidate
 ↓
Evaluate
 ↓
Duplicate / Conflict
 ↓
Validate
 ↓
Memory

Implementasi:

- memory model
- candidate detection
- duplicate detection
- conflict detection
- lifecycle
- archive
- supersede

---

Phase 12 — Tool System

Status: PLANNED

Tujuan:
Menyediakan kemampuan yang dapat dipanggil AI/Agent.

Tool awal:

search_knowledge
get_knowledge
get_relationships
create_knowledge
update_knowledge
delete_knowledge

Implementasi:

- Tool Registry
- tool schema
- input validation
- output validation
- permission
- execution boundary
- error handling

Aturan:

Tool tidak boleh melewati Application / Domain boundary.

---

Phase 13 — Agent Engine

Status: PLANNED

Tujuan:
Membangun kemampuan multi-step reasoning dan execution.

Pipeline:

Goal
 ↓
Understand
 ↓
Plan
 ↓
Tool
 ↓
Observation
 ↓
Evaluate
 ↓
Next Action
 ↓
...
 ↓
Done

Implementasi:

- agent state
- planner
- tool executor
- observation
- evaluation
- loop control
- limits
- permission
- stop conditions

Limits:

max_steps
max_time
max_tool_calls
max_context

Agent hanya dibangun setelah infrastructure sebelumnya stabil.

---

Phase 14 — Advanced Infrastructure

Status: FUTURE

Fitur yang sengaja ditunda:

- GitHub storage adapter
- cloud sync
- multi-device synchronization
- embeddings
- vector search
- semantic retrieval
- advanced graph traversal
- subagents
- advanced memory
- offline-first improvements
- APK
- advanced automation

Fitur phase ini tidak boleh masuk MVP sebelum fondasi stabil.

---

Development Protocol

Setiap perubahan mengikuti:

PLAN
 ↓
IMPLEMENT
 ↓
TEST
 ↓
VERIFY
 ↓
COMMIT
 ↓
PUSH

Tidak langsung melompat dari ide ke implementasi besar.

---

Phase Completion Rule

Sebuah phase dianggap selesai jika:

Implementation
      ↓
Test
      ↓
Verification
      ↓
Git Commit
      ↓
Checkpoint

Tidak berpindah phase hanya karena code sudah berjalan.

---

Change Control

Sebelum menambahkan fitur baru, periksa:

1. Apakah fitur berada dalam roadmap?
2. Berada di layer mana?
3. Apakah mengubah domain model?
4. Apakah melanggar keputusan yang sudah dikunci?
5. Apa dependensinya?
6. Bagaimana cara mengujinya?

Jika belum jelas:

STOP → ANALYZE → DECIDE → IMPLEMENT

---

Current Checkpoint

Project:
Cognexus

Implementation:
REBUILD FROM ZERO

Architecture:
LOCKED

Roadmap:
LOCKED

Current Phase:
Phase 0 — Architecture Lock

Completed:
- Architecture definition
- System layers
- Knowledge model
- Graph model
- Sync concept
- Query concept
- Context concept
- AI boundary
- Memory concept
- Tool concept
- Agent concept

Next:
Finalize DECISIONS.md
 ↓
Initialize clean project
 ↓
Phase 1 — Foundation

---

Core Development Principle

«Build the smallest correct layer before building the next layer.»

«Do not add complexity before the current layer has been verified.»

«Implementation starts from zero. Architecture does not.»
