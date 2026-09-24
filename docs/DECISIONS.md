Cognexus Decision Log

Dokumen ini berisi keputusan arsitektur yang telah disepakati untuk Cognexus.

Keputusan yang tercantum di sini dianggap locked sampai dilakukan perubahan secara eksplisit.

---

D001 — Rebuild From Zero

Status: LOCKED

Cognexus dibangun dari nol.

Implementasi lama tidak menjadi fondasi implementasi baru.

Arsitektur dan keputusan yang telah disepakati tetap digunakan sebagai referensi.

Alasan:

Implementasi lama sudah terlalu banyak perubahan dan patch sehingga rebuild memberikan fondasi yang lebih bersih dan dapat diverifikasi.

---

D002 — Markdown Is Source of Truth

Status: LOCKED

Markdown adalah sumber kebenaran utama Knowledge.

IndexedDB bukan source of truth.

IndexedDB digunakan sebagai runtime storage, index, dan cache.

---

D003 — IndexedDB Is Runtime Storage

Status: LOCKED

IndexedDB digunakan untuk:

- runtime data
- indexing
- fast lookup
- offline operation

IndexedDB tidak menggantikan Markdown sebagai source of truth.

---

D004 — One Knowledge Entity = One Markdown File

Status: LOCKED

Setiap Knowledge Entity memiliki satu file Markdown.

Identity menggunakan UUID sehingga perubahan nama atau lokasi file tidak mengubah identity entity.

---

D005 — Knowledge Types

Status: LOCKED

Knowledge Entity memiliki tipe awal:

Concept
Tool
Workflow
Lesson
Project

Penambahan tipe baru harus melalui keputusan eksplisit.

---

D006 — Capture Is Separate From Knowledge

Status: LOCKED

Capture adalah input mentah.

Capture tidak otomatis menjadi Knowledge Entity.

Capture dapat diproses menjadi Knowledge Candidate.

---

D007 — UUID Identity

Status: LOCKED

Semua entity utama menggunakan UUID sebagai identity.

UUID bersifat immutable.

Perubahan title, content, atau file path tidak mengubah identity.

---

D008 — Relationships Are Directed

Status: LOCKED

Relationship memiliki arah.

Contoh:

A ──supports──> B

Tidak membuat reverse relationship otomatis.

---

D009 — Markdown Owns Relationship Declaration

Status: LOCKED

Relationship canonical dideklarasikan pada sumber Markdown.

IndexedDB menyimpan runtime representation dari relationship tersebut.

---

D010 — No Blind Last-Write-Wins

Status: LOCKED

Sync Engine tidak boleh menggunakan blind last-write-wins.

Jika terdapat konflik:

BASE
LOCAL
REMOTE

konflik harus dapat dideteksi dan diselesaikan secara eksplisit.

---

D011 — Validation Before Sync

Status: LOCKED

Data harus divalidasi sebelum masuk ke runtime melalui Sync Engine.

Markdown yang invalid tidak boleh menimpa data runtime yang valid.

---

D012 — Domain Boundary

Status: LOCKED

UI, AI, dan Agent tidak boleh mengakses storage secara langsung.

Semua operasi harus melalui Application / Domain boundary.

Contoh:

UI
 ↓
Application API
 ↓
Domain
 ↓
Infrastructure
 ↓
Storage

---

D013 — AI Is Not Source of Truth

Status: LOCKED

AI dapat:

- membaca context
- menganalisis
- mengklasifikasikan
- mengusulkan perubahan
- membuat candidate

AI tidak otomatis menentukan bahwa informasi tersebut benar.

AI-generated knowledge harus melalui validation dan permission boundary.

---

D014 — Knowledge Graph Is First-Class

Status: LOCKED

Relationship dan graph bukan fitur tambahan.

Graph merupakan bagian fundamental dari model Cognexus.

---

D015 — Deterministic Retrieval Before Semantic Search

Status: LOCKED

Retrieval deterministic dibangun sebelum:

- embeddings
- vector search
- semantic retrieval

Alasan:

Fondasi retrieval harus mudah dipahami, diuji, dan diverifikasi sebelum menambahkan kompleksitas semantic search.

---

D016 — Context Is Separate From Knowledge

Status: LOCKED

Knowledge adalah data.

Context adalah hasil penyusunan data untuk kebutuhan tertentu.

Context tidak menjadi Knowledge secara otomatis.

---

D017 — Memory Is Different From Knowledge

Status: LOCKED

Memory dan Knowledge adalah dua konsep berbeda.

Knowledge menyimpan informasi yang ingin dipertahankan sebagai pengetahuan.

Memory menyimpan informasi mengenai konteks pengguna dan keadaan sistem yang berguna untuk interaksi berikutnya.

---

D018 — Agent Is Built After Infrastructure

Status: LOCKED

Agent Engine dibangun setelah:

- Domain
- Storage
- Markdown
- Sync
- Graph
- Query
- Context
- Tool boundary

telah tersedia dan cukup stabil.

Agent bukan fondasi awal Cognexus.

---

D019 — Simple Q&A Can Bypass Agent

Status: LOCKED

Tidak semua interaksi membutuhkan Agent.

Pertanyaan sederhana dapat menggunakan:

Query
 ↓
Context
 ↓
LLM

Agent digunakan ketika diperlukan proses multi-step atau penggunaan tools.

---

D020 — One-Hop Graph Expansion First

Status: LOCKED

Graph traversal awal menggunakan:

maxDepth = 1

Traversal yang lebih dalam dapat ditambahkan setelah fondasi graph terbukti stabil.

---

D021 — Incremental Development

Status: LOCKED

Cognexus dibangun secara bertahap.

Setiap phase harus:

IMPLEMENT
 ↓
TEST
 ↓
VERIFY
 ↓
COMMIT

Fitur baru tidak boleh digunakan untuk menutupi fondasi yang belum terverifikasi.

---

D022 — GitHub Is Verification Source

Status: LOCKED

Git digunakan sebagai sumber version history dan verification.

Setiap milestone penting harus memiliki commit yang jelas.

GitHub digunakan untuk memastikan keadaan project dapat dilacak dan dibandingkan.

---

D023 — Architecture Changes Require Explicit Decision

Status: LOCKED

Keputusan arsitektur tidak boleh berubah secara tidak sengaja karena implementasi.

Jika implementasi menunjukkan bahwa keputusan perlu diubah:

Problem
 ↓
Analysis
 ↓
Decision
 ↓
Update Decision Log
 ↓
Implementation

---

D024 — No Premature Complexity

Status: LOCKED

Kompleksitas hanya ditambahkan ketika terdapat kebutuhan nyata.

Contoh teknologi yang sengaja ditunda:

- vector database
- embeddings
- subagents
- cloud sync
- advanced graph
- advanced memory
- APK

Fondasi harus stabil sebelum sistem diperluas.

---

D025 — Architecture Is The Constraint

Status: LOCKED

Arsitektur bukan sekadar dokumentasi.

Arsitektur berfungsi sebagai batas yang menjaga implementasi tetap konsisten.

Jika suatu implementasi bertentangan dengan arsitektur:

STOP
 ↓
CHECK
 ↓
DECIDE

Bukan langsung melakukan patch.

---

D026 — Flexible Status And Epistemic Values

Status: LOCKED

Domain validation does not restrict status or epistemic_status to a fixed enum.

The domain validates the structural requirements of Knowledge, while status and epistemic_status may evolve without requiring a domain-model change.

Current defaults remain:

status:
active

epistemic_status:
known

---

D027 — Knowledge Source And Reference Are Required

Status: LOCKED

Every Knowledge Entity must contain:

source:
  type: ...
  ref: ...

Both source.type and source.ref are required.

This makes provenance a mandatory part of Knowledge metadata.

---

D028 — Source Reference May Be Internal Or External

Status: LOCKED

source.ref may reference either:

- an internal Cognexus entity
- an external source

The exact reference structure is defined by D030.

---

D029 — Source Type Is Flexible

Status: LOCKED

source.type is not restricted by the domain to a fixed enum.

Cognexus may introduce new source types without requiring a domain-model change.

Examples of source types include:

- user
- external
- derived
- ai
- import
- system
- agent
- api
- migration

Domain validation requires source.type to exist and be structurally valid, but does not restrict its value to a predefined list.

The application may define normalization or conventions for source types separately when needed.

---

D030 — Source Reference Is Structured

Status: LOCKED

source.ref is a structured object rather than a free-form string.

Required structure:

source:
  type: ...
  ref:
    kind: ...
    value: ...

ref.kind identifies the reference form.

ref.value contains the actual reference value.

Examples:

Internal reference:

source:
  type: derived
  ref:
    kind: entity
    value: capture-123

External URL:

source:
  type: external
  ref:
    kind: url
    value: https://example.com/article

---

D031 — Source Reference Kind Is Flexible

Status: LOCKED

ref.kind is not restricted by the domain to a fixed enum.

Cognexus may introduce new reference kinds without requiring a domain-model change.

Examples include:

- entity
- url
- file
- document
- message
- api
- custom

Domain validation requires ref.kind and ref.value to exist and be structurally valid, but does not restrict ref.kind to a predefined list.

Application-level conventions may define recognized kinds when needed.

---

D032 — Source Reference Value Is Flexible

Status: LOCKED

source.ref.value is not restricted to a string.

The value may be a structured value appropriate to the reference kind.

Examples:

Entity reference:

source:
  type: derived
  ref:
    kind: entity
    value:
      id: capture-123

Coordinate reference:

source:
  type: external
  ref:
    kind: coordinates
    value:
      lat: -6.2
      lng: 106.8

Domain validation requires ref.value to exist and be structurally valid, but does not require it to have a single primitive type.

Reference-kind-specific schemas and semantic validation may be defined at the application layer when needed.

---

D033 — Reference Kind Schema Registry

Status: LOCKED

Cognexus uses a schema registry for recognized ref.kind values.

The registry defines the expected structure of ref.value for known reference kinds.

The registry is extensible and does not turn ref.kind into a fixed enum.

Example:

entity → { id }
url → string
file → { path }

Unknown or custom reference kinds may remain structurally valid without requiring an immediate registry entry.

Reference-kind-specific validation belongs to the application layer and must not redefine the flexible domain model established by D031 and D032.

---

D034 — Reference Schema Registry Is External Configuration

Status: LOCKED

Reference-kind schemas are stored as external configuration/data rather than being hardcoded into application logic.

Example location:

config/reference-schemas.json

The registry remains extensible: adding or changing a recognized reference schema should primarily modify configuration rather than the core domain model.

The application validates and consumes the registry, while the domain continues to require only the structural validity defined by D031 and D032.

---

D035 — Reference Schema Registry Is Static At Runtime

Status: LOCKED

The reference schema registry is not modified or registered dynamically while Cognexus is running.

Schema changes are made through the application's source/configuration and take effect when the updated application is deployed or loaded.

Runtime code may read and validate against the registry, but may not mutate the registry definition.

This keeps schema behavior deterministic and avoids introducing runtime schema persistence, synchronization, or security complexity at the foundation stage.

---

Decision Change Protocol

Jika suatu keputusan ingin diubah:

1. Identify the decision
2. Explain the problem
3. Analyze the impact
4. Propose the alternative
5. Decide explicitly
6. Update this document
7. Update affected architecture
8. Update roadmap if necessary
9. Implement
10. Test
11. Verify
12. Commit

---

Current Decision State

Total Locked Decisions: 35

Architecture:
LOCKED

Roadmap:
LOCKED

Implementation:
REBUILD FROM ZERO

Language:
Vanilla JavaScript

Source of Truth:
Markdown

Runtime Storage:
IndexedDB

Graph:
First-Class

AI:
Not Source of Truth

Agent:
Built After Infrastructure

---

Core Rule

«Architecture defines the boundaries.»

«Decisions define the constraints.»

«Implementation must operate within both.