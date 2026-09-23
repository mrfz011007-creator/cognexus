Cognexus Architecture

1. System Purpose

Cognexus adalah personal knowledge infrastructure.

Tujuan utamanya adalah mengubah informasi, pengalaman, ide, dan pengetahuan menjadi sistem yang:

- terstruktur
- saling terhubung
- dapat dicari
- dapat diproses AI
- dapat berkembang tanpa kehilangan data

Cognexus bukan sekadar aplikasi catatan.

---

2. Core Architecture

Markdown Source of Truth
        ↓
    Sync Engine
        ↓
IndexedDB Runtime / Index / Cache
        ↓
     Cognexus
        ↓
   AI / Agent

Markdown adalah sumber kebenaran utama.

IndexedDB digunakan sebagai runtime storage agar aplikasi dapat bekerja cepat dan offline.

---

3. Architecture Layers

UI / AI / Agent
       ↓
Application API
       ↓
Domain
       ↓
Infrastructure
       ↓
Storage

UI

Bertanggung jawab terhadap:

- tampilan
- input pengguna
- navigasi
- interaksi

UI tidak boleh mengakses storage secara langsung.

Application

Mengatur use case dan alur aplikasi.

Contoh:

- create knowledge
- update knowledge
- search knowledge
- process capture
- sync

Domain

Berisi aturan inti Cognexus.

Contoh:

- Knowledge
- Capture
- Relationship
- Memory
- Candidate
- Context

Domain tidak bergantung pada UI atau database tertentu.

Infrastructure

Menghubungkan domain dengan teknologi eksternal.

Contoh:

- IndexedDB
- Markdown filesystem
- Sync provider
- AI provider

---

4. Knowledge Model

Knowledge Entity:

Knowledge Entity
├── Concept
├── Tool
├── Workflow
├── Lesson
└── Project

Setiap Knowledge Entity memiliki:

id
type
title
content
source
status
epistemic_status
tags
created_at
updated_at

Identity

Setiap entity menggunakan UUID.

UUID bersifat immutable.

Identity tidak berubah walaupun:

- judul berubah
- lokasi file berubah
- isi berubah

---

5. Markdown Storage

Satu Knowledge Entity = satu file Markdown.

Struktur:

knowledge/
├── concepts/
├── tools/
├── workflows/
├── lessons/
└── projects/

captures/

Contoh:

---
id: UUID
type: Concept
title: IndexedDB
status: active
epistemic_status: known
tags:
  - database
  - browser
source:
  type: user
created_at: ...
updated_at: ...
relationships:
  - relation: supports
    target: UUID
---

# IndexedDB

## Definition

...

Frontmatter digunakan untuk metadata mesin.

Body Markdown digunakan untuk isi yang dibaca manusia.

---

6. Capture

Capture adalah input mentah dari pengguna.

Contoh:

{
  id,
  content,
  type,
  status,
  created_at,
  updated_at
}

Capture tidak otomatis menjadi Knowledge Entity.

Capture bersifat permanen dan dapat menjadi sumber bagi proses berikutnya.

---

7. Knowledge Candidate

Candidate adalah hasil pemrosesan Capture yang belum tervalidasi.

{
  id,
  source_capture_id,
  proposed_type,
  proposed_title,
  proposed_content,
  proposed_relationships,
  status,
  created_at,
  updated_at
}

Pipeline:

Capture
   ↓
Processing
   ↓
Candidate
   ↓
Validation
   ↓
User / Rule Confirmation
   ↓
Knowledge API
   ↓
Markdown

AI dapat membantu:

- extraction
- classification
- structuring
- linking
- validation

AI bukan source of truth.

---

8. Relationships

Relationship adalah bagian inti dari Cognexus.

{
  id,
  from_type,
  from_id,
  relation,
  to_type,
  to_id,
  status,
  created_at
}

Relationship bersifat directed.

Contoh:

IndexedDB
   ──supports──>
Browser Storage

Identity relationship:

from_type
+
from_id
+
relation
+
to_type
+
to_id

Tidak boleh ada duplicate edge.

Relationship menggunakan index untuk:

- from
- to
- relation
- uniqueEdge

Relationship canonical dideklarasikan pada Markdown sumber.

Tidak membuat reverse relationship otomatis.

---

9. Graph

Graph terdiri dari node dan edge.

Node utama:

Concept
Tool
Workflow
Lesson
Project
Capture

Traversal default:

depth = 1

Contoh:

Query
 ↓
IndexedDB
 ↓
supports
 ↓
Browser Storage

Graph engine harus menangani:

- visited nodes
- cycle
- deleted nodes
- unresolved targets

---

10. Sync Engine

Arsitektur:

Markdown
   ↓
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

Sync state:

{
  entity_id,
  file_path,
  content_hash,
  last_synced_at
}

Change detector harus dapat membedakan:

NEW
CHANGED
UNCHANGED
DELETED

Markdown yang invalid tidak boleh menimpa runtime yang valid.

Tidak menggunakan blind last-write-wins.

Conflict harus dapat menggunakan:

BASE
LOCAL
REMOTE

kemudian membutuhkan resolusi eksplisit.

Sync dilakukan secara:

- startup
- manual

Tidak menggunakan aggressive polling.

Tidak boleh ada concurrent sync.

Storage Adapter dipisahkan dari Sync Provider.

---

11. Query Engine

Arsitektur:

Query
 ↓
Text Search
 ↓
Primary Knowledge
 ↓
Relationship Expansion
 ↓
Context

Retrieval awal bersifat deterministic.

Ranking:

Exact title      +3
Title contains   +2
Tag              +2
Content          +1

Related entity digunakan sebagai context, bukan menggantikan primary result.

Output:

{
  primary,
  related,
  total,
  query,
  execution_time
}

Semantic search dan vector search bukan bagian dari fondasi awal.

---

12. Context Engine

Query
 ↓
Query Engine
 ↓
Primary
 ↓
Graph Engine
 ↓
Related
 ↓
Context Engine
 ↓
AI

Context:

{
  query,
  primary,
  related,
  sources,
  metadata,
  limits
}

Context engine harus menjaga:

- provenance
- epistemic status
- batas jumlah item
- batas karakter

---

13. AI Integration

AI menggunakan abstraction layer.

AI terdiri dari:

LLM Provider
Prompt Construction
Response Parser
Permission Boundary

AI tidak boleh langsung mengakses:

- IndexedDB
- filesystem
- database

AI menghasilkan proposed action.

Alurnya:

AI
 ↓
Proposed Action
 ↓
Validator
 ↓
Permission
 ↓
Knowledge API
 ↓
Storage

AI-generated knowledge tidak otomatis dianggap trusted.

---

14. Memory

Memory berbeda dari Knowledge.

Kategori awal:

Preference
Decision
Goal
Project State
User Context

Tidak semua percakapan disimpan sebagai memory.

Pipeline:

Conversation
 ↓
Candidate
 ↓
Evaluate
 ↓
Duplicate / Conflict Check
 ↓
Validate
 ↓
Memory

Lifecycle:

active
 ↓
outdated / superseded
 ↓
archived

Source of truth memory akan ditentukan kemudian.

---

15. Tool System

Tool memiliki contract eksplisit.

Tool awal:

search_knowledge
get_knowledge
get_relationships
create_knowledge
update_knowledge
delete_knowledge

Tool memiliki:

name
description
input schema
output schema
permission

Permission:

read
write
destructive
external_write

Tool tidak boleh melewati Domain / Knowledge API.

Arbitrary JavaScript execution bukan bagian dari MVP.

---

16. Agent Engine

Agent digunakan untuk tugas multi-step.

Arsitektur:

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

Agent state:

{
  id,
  goal,
  status,
  current_step,
  actions,
  observations,
  errors,
  started_at,
  updated_at
}

Agent memiliki batas:

max_steps
max_time
max_tool_calls
max_context

Agent berhenti ketika:

done
no next action
max limit
fatal error
permission required
user stop

Simple Q&A dapat melewati Agent.

Agent dibangun setelah infrastructure siap.

---

17. Canonical System Objects

System Objects
├── Capture
├── Knowledge Entity
│   ├── Concept
│   ├── Tool
│   ├── Workflow
│   ├── Lesson
│   └── Project
├── Relationship
├── Memory
├── Knowledge Candidate
├── Context
├── Tool
├── Agent State
└── Sync State

---

18. Core Principles

Markdown First

Data utama harus tetap portable.

Domain First

Business rules tidak bergantung pada teknologi storage.

Deterministic First

Fondasi sistem harus dapat dipahami dan diuji sebelum menggunakan AI atau semantic search.

AI Is Not Source of Truth

AI membantu memproses pengetahuan tetapi tidak menentukan kebenaran data secara otomatis.

Graph Is First-Class

Hubungan antar informasi merupakan bagian fundamental dari sistem.

Explicit Over Magic

Sistem lebih mengutamakan aturan eksplisit daripada perilaku otomatis yang sulit diprediksi.

Incremental Development

Setiap layer dibangun, diuji, diverifikasi, kemudian menjadi fondasi layer berikutnya.

---

19. Implementation Constraint

Cognexus menggunakan:

Vanilla JavaScript

Tidak menggunakan framework frontend sebagai fondasi MVP.

Arsitektur harus tetap memungkinkan pengembangan berikutnya tanpa merusak domain model.

---

20. Current Implementation Strategy

Cognexus dibangun dari nol.

Implementasi lama bukan fondasi baru.

Namun keputusan arsitektur yang telah disepakati tetap menjadi referensi.

Urutan implementasi:

Architecture
 ↓
Foundation
 ↓
Domain
 ↓
Runtime Storage
 ↓
Markdown Storage
 ↓
Sync Engine
 ↓
Graph
 ↓
Query
 ↓
Context
 ↓
Knowledge Processing
 ↓
AI
 ↓
Memory
 ↓
Tools
 ↓
Agent

Prinsip utama:

«Implementation starts from zero. Architecture does not.»
