export interface SystemDesignProblem {
  id: string;
  number: number;
  title: string;
  section: "Foundations" | "HLD" | "Design Patterns" | "LLD";
  pillar: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  keyComponents: string[];
  ytVideo?: string;
  referenceUrl?: string;
}

export interface SystemDesignPillarGroup {
  id: string;
  name: string;
  section: "Foundations" | "HLD" | "Design Patterns" | "LLD";
  problems: SystemDesignProblem[];
}

export const systemDesignProblems: SystemDesignProblem[] = [
  /* =========================================================================
     PART 1: SYSTEM DESIGN FOUNDATIONS (32 Topics)
     ========================================================================= */

  // Pillar 1: Metrics & Estimation
  {
    id: "sd-1",
    number: 1,
    title: "Latency vs Throughput & Availability Metrics",
    section: "Foundations",
    pillar: "Performance & Estimation",
    difficulty: "Easy",
    description:
      "Understand p50, p90, and p99 latency percentiles, SLA vs SLO vs SLI, and calculating 'Five 9s' (99.999%) downtime tolerance.",
    keyComponents: ["Latency", "Throughput", "p99", "SLA / SLO", "Availability"],
    ytVideo: "https://www.youtube.com/watch?v=8UekgVn_yK4",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#performance-vs-scalability",
  },
  {
    id: "sd-2",
    number: 2,
    title: "Back-of-the-Envelope Estimation",
    section: "Foundations",
    pillar: "Performance & Estimation",
    difficulty: "Easy",
    description:
      "Powers of two calculation guide, latency numbers every programmer should know (L1 cache vs RAM vs SSD vs Network), calculating QPS, bandwidth, and 5-year storage capacity.",
    keyComponents: [
      "Capacity Estimation",
      "QPS",
      "Bandwidth",
      "Storage Math",
      "Hardware Latencies",
    ],
    ytVideo: "https://www.youtube.com/watch?v=hnpzNAPiC0E",
    referenceUrl:
      "https://github.com/donnemartin/system-design-primer#back-of-the-envelope-calculations",
  },

  // Pillar 2: Networking & Communication Protocols
  {
    id: "sd-3",
    number: 3,
    title: "OSI Model & TCP vs UDP",
    section: "Foundations",
    pillar: "Networking & Protocols",
    difficulty: "Easy",
    description:
      "TCP 3-way handshake, flow control, congestion control, SYN flood mitigation, and when to use UDP for low-latency streaming and gaming.",
    keyComponents: ["TCP", "UDP", "Handshake", "Flow Control", "OSI Layer"],
    ytVideo: "https://www.youtube.com/watch?v=uwoD5YsGACg",
    referenceUrl:
      "https://github.com/donnemartin/system-design-primer#transmission-control-protocol-tcp",
  },
  {
    id: "sd-4",
    number: 4,
    title: "HTTP Evolution: HTTP/1.1 vs HTTP/2 vs HTTP/3",
    section: "Foundations",
    pillar: "Networking & Protocols",
    difficulty: "Medium",
    description:
      "Keep-Alive connections, HTTP pipelining limitations, HTTP/2 multiplexing over a single TCP stream, HPACK compression, and QUIC protocol over UDP.",
    keyComponents: ["HTTP/1.1", "HTTP/2", "HTTP/3", "QUIC", "Multiplexing"],
    ytVideo: "https://www.youtube.com/watch?v=a-sBfyiXysI",
    referenceUrl:
      "https://github.com/donnemartin/system-design-primer#hypertext-transfer-protocol-http",
  },
  {
    id: "sd-5",
    number: 5,
    title: "Real-Time Protocols: WebSockets, Long Polling & SSE",
    section: "Foundations",
    pillar: "Networking & Protocols",
    difficulty: "Medium",
    description:
      "Compare regular polling, HTTP long-polling, bidirectional WebSockets, Server-Sent Events (SSE), and WebRTC for peer-to-peer media streaming.",
    keyComponents: ["WebSockets", "Long Polling", "SSE", "WebRTC", "Bi-directional"],
    ytVideo: "https://www.youtube.com/watch?v=i5OVcTbfET8",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#communication",
  },
  {
    id: "sd-6",
    number: 6,
    title: "RPC vs REST (gRPC & Protocol Buffers)",
    section: "Foundations",
    pillar: "Networking & Protocols",
    difficulty: "Medium",
    description:
      "Binary Protobuf serialization vs JSON REST over HTTP, strict contract schemas, client code generation, and microservices internal communication.",
    keyComponents: ["gRPC", "Protobuf", "REST", "Binary Serialization", "Microservices"],
    ytVideo: "https://www.youtube.com/watch?v=gnchfO1rxFc",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#remote-procedure-call-rpc",
  },
  {
    id: "sd-7",
    number: 7,
    title: "Domain Name System (DNS) & Anycast Routing",
    section: "Foundations",
    pillar: "Networking & Protocols",
    difficulty: "Easy",
    description:
      "Recursive and authoritative DNS resolvers, A/AAAA/CNAME records, DNS caching and TTL, GeoDNS routing, and Anycast BGP routing.",
    keyComponents: ["DNS", "Anycast", "TTL", "GeoDNS", "Routing"],
    ytVideo: "https://www.youtube.com/watch?v=27r4Bzuj5NQ",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#domain-name-system",
  },
  {
    id: "sd-8",
    number: 8,
    title: "Content Delivery Networks (CDN) & Edge Compute",
    section: "Foundations",
    pillar: "Networking & Protocols",
    difficulty: "Easy",
    description:
      "Push CDNs vs Pull CDNs, origin shield, cache purge strategies, edge SSL termination, and running lightweight serverless code at edge PoPs.",
    keyComponents: ["CDN", "Edge Cache", "Push vs Pull", "Cloudflare", "Cache Invalidation"],
    ytVideo: "https://www.youtube.com/watch?v=d_oU_V0c0r8",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#content-delivery-network",
  },

  // Pillar 3: Scalability, Load Balancing & Routing
  {
    id: "sd-9",
    number: 9,
    title: "Horizontal vs Vertical Scaling & Stateless Architecture",
    section: "Foundations",
    pillar: "Scalability & Load Balancing",
    difficulty: "Easy",
    description:
      "Scale-up limits vs scale-out architecture, stateless web tier design, centralized session stores (Redis) vs JWT token validation.",
    keyComponents: ["Horizontal Scaling", "Stateless", "JWT Sessions", "Auto-scaling"],
    ytVideo: "https://www.youtube.com/watch?v=xpDnVSmNFX0",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#scalability",
  },
  {
    id: "sd-10",
    number: 10,
    title: "Load Balancers (Layer 4 vs Layer 7)",
    section: "Foundations",
    pillar: "Scalability & Load Balancing",
    difficulty: "Medium",
    description:
      "Transport layer (TCP/UDP, IP:port) vs Application layer (HTTP header, cookies, path) load balancing, SSL termination, and health check mechanics.",
    keyComponents: ["Load Balancer", "L4 vs L7", "SSL Termination", "Reverse Proxy"],
    ytVideo: "https://www.youtube.com/watch?v=K0Ta65OqQkY",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#load-balancer",
  },
  {
    id: "sd-11",
    number: 11,
    title: "Load Balancing Algorithms",
    section: "Foundations",
    pillar: "Scalability & Load Balancing",
    difficulty: "Easy",
    description:
      "Round Robin, Weighted Round Robin, Least Connections, Least Response Time, and IP Hash algorithms for balancing traffic across servers.",
    keyComponents: ["Round Robin", "Least Connections", "IP Hash", "Weighted Routing"],
    ytVideo: "https://www.youtube.com/watch?v=K0Ta65OqQkY",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#load-balancer",
  },
  {
    id: "sd-12",
    number: 12,
    title: "Consistent Hashing & Virtual Nodes",
    section: "Foundations",
    pillar: "Scalability & Load Balancing",
    difficulty: "Medium",
    description:
      "Hash ring topology, minimizing key redistribution when nodes join or fail, solving uneven key distribution with Virtual Nodes (VNodes), and Ketama algorithm.",
    keyComponents: ["Consistent Hashing", "Hash Ring", "Virtual Nodes", "Key Rebalancing"],
    ytVideo: "https://www.youtube.com/watch?v=zaRkONvyGr8",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#consistent-hashing",
  },
  {
    id: "sd-13",
    number: 13,
    title: "Reverse Proxies & API Gateways",
    section: "Foundations",
    pillar: "Scalability & Load Balancing",
    difficulty: "Medium",
    description:
      "Forward proxy vs reverse proxy (Nginx, Envoy), API Gateway duties: authentication, rate limiting, request routing, metric logging, and circuit breaking.",
    keyComponents: ["API Gateway", "Reverse Proxy", "Nginx", "Envoy", "SSL Offloading"],
    ytVideo: "https://www.youtube.com/watch?v=1v_4xNlGfL8",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#reverse-proxy-web-server",
  },

  // Pillar 4: Caching & In-Memory Stores
  {
    id: "sd-14",
    number: 14,
    title: "Caching Strategies & Write Policies",
    section: "Foundations",
    pillar: "Caching Internals",
    difficulty: "Medium",
    description:
      "Cache-Aside (Lazy loading), Read-Through, Write-Through, Write-Back (Write-Behind), and Write-Around strategies with consistency trade-offs.",
    keyComponents: ["Cache-Aside", "Write-Through", "Write-Back", "Write-Around", "Caching"],
    ytVideo: "https://www.youtube.com/watch?v=7uKj4bVv3bA",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#cache",
  },
  {
    id: "sd-15",
    number: 15,
    title: "Cache Eviction Algorithms (LRU, LFU, ARC)",
    section: "Foundations",
    pillar: "Caching Internals",
    difficulty: "Medium",
    description:
      "Least Recently Used (LRU), Least Frequently Used (LFU), First In First Out (FIFO), and Adaptive Replacement Cache (ARC) eviction mechanics.",
    keyComponents: ["LRU", "LFU", "Cache Eviction", "Doubly Linked List", "O(1) Access"],
    ytVideo: "https://www.youtube.com/watch?v=S6XhW86P_A0",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#cache",
  },
  {
    id: "sd-16",
    number: 16,
    title: "Cache Pitfalls: Stampede, Penetration, Breakdown, Avalanche",
    section: "Foundations",
    pillar: "Caching Internals",
    difficulty: "Hard",
    description:
      "Solving Cache Stampede (mutex lock, early probabilistic refresh), Cache Penetration (Bloom filters, empty keys), Cache Breakdown, and Cache Avalanche (randomized TTLs).",
    keyComponents: ["Cache Stampede", "Bloom Filter", "Cache Avalanche", "TTL Jitter"],
    ytVideo: "https://www.youtube.com/watch?v=7uKj4bVv3bA",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#cache",
  },
  {
    id: "sd-17",
    number: 17,
    title: "Redis Internals & Architecture Deep Dive",
    section: "Foundations",
    pillar: "Caching Internals",
    difficulty: "Hard",
    description:
      "Single-threaded event loop with epoll multiplexing, data structures (Strings, Hashes, Lists, Sets, Sorted Sets, Streams), persistence (RDB snapshots vs AOF append logs), Redis Cluster vs Sentinel.",
    keyComponents: ["Redis", "Event Loop", "RDB", "AOF", "Redis Cluster", "Data Structures"],
    ytVideo: "https://www.youtube.com/watch?v=iuqZvajTOHg",
    referenceUrl: "https://redis.io/docs/latest/develop/data-types/",
  },

  // Pillar 5: Databases & Storage Engines
  {
    id: "sd-18",
    number: 18,
    title: "SQL vs NoSQL Paradigms & Data Modeling",
    section: "Foundations",
    pillar: "Databases & Storage",
    difficulty: "Medium",
    description:
      "Relational (PostgreSQL/MySQL) vs Document (MongoDB) vs Key-Value (DynamoDB) vs Wide-Column (Cassandra) vs Graph (Neo4j) vs Time-Series vs Vector DBs.",
    keyComponents: ["SQL", "NoSQL", "Document DB", "Key-Value", "Wide-Column", "Graph DB"],
    ytVideo: "https://www.youtube.com/watch?v=QfCO_fR2u-k",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#database",
  },
  {
    id: "sd-19",
    number: 19,
    title: "ACID Properties & Transaction Isolation Levels",
    section: "Foundations",
    pillar: "Databases & Storage",
    difficulty: "Hard",
    description:
      "Atomicity, Consistency, Isolation, Durability. The 4 isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) and phenomena (Dirty read, Non-repeatable read, Phantom read, Write skew).",
    keyComponents: ["ACID", "Isolation Levels", "Dirty Reads", "Phantom Reads", "MVCC"],
    ytVideo: "https://www.youtube.com/watch?v=ga3vU_qOweY",
    referenceUrl:
      "https://github.com/donnemartin/system-design-primer#relational-database-management-system-rdbms",
  },
  {
    id: "sd-20",
    number: 20,
    title: "Database Indexing: B+ Trees vs LSM-Trees",
    section: "Foundations",
    pillar: "Databases & Storage",
    difficulty: "Hard",
    description:
      "B+ Tree read-optimized indexes (clustered vs non-clustered, branch factors) vs Log-Structured Merge (LSM) Trees (MemTable, WAL, SSTables, compaction in RocksDB/Cassandra) for write-heavy workloads.",
    keyComponents: ["B+ Trees", "LSM-Trees", "SSTables", "WAL", "Clustered Index"],
    ytVideo: "https://www.youtube.com/watch?v=wYZx_E6E60c",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#sql",
  },
  {
    id: "sd-21",
    number: 21,
    title: "Database Replication: Master-Slave vs Multi-Master",
    section: "Foundations",
    pillar: "Databases & Storage",
    difficulty: "Medium",
    description:
      "Synchronous vs asynchronous replication, read replicas, replication lag mitigation, read-your-own-writes consistency, and multi-leader conflict resolution.",
    keyComponents: ["Replication", "Read Replicas", "Replication Lag", "Master-Slave"],
    ytVideo: "https://www.youtube.com/watch?v=1K5_g2Z_b-g",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#master-slave-replication",
  },
  {
    id: "sd-22",
    number: 22,
    title: "Database Partitioning & Sharding Strategies",
    section: "Foundations",
    pillar: "Databases & Storage",
    difficulty: "Hard",
    description:
      "Horizontal vs vertical partitioning, sharding keys selection, range-based vs hash-based vs directory-based sharding, cross-shard joins, and online re-sharding techniques.",
    keyComponents: ["Sharding", "Partitioning", "Sharding Key", "Cross-Shard Queries"],
    ytVideo: "https://www.youtube.com/watch?v=5faMjKuB9bc",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#sharding",
  },
  {
    id: "sd-23",
    number: 23,
    title: "OLTP vs OLAP & Columnar Storage",
    section: "Foundations",
    pillar: "Databases & Storage",
    difficulty: "Medium",
    description:
      "Row-oriented transaction databases (OLTP) vs Columnar analytical databases (OLAP: ClickHouse, Snowflake, Redshift), Star/Snowflake schemas, and batch/stream ETL pipelines.",
    keyComponents: ["OLTP", "OLAP", "Columnar Storage", "ClickHouse", "Data Warehouse"],
    ytVideo: "https://www.youtube.com/watch?v=KzY_K6tLz9w",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#database",
  },

  // Pillar 6: Distributed Systems Theory
  {
    id: "sd-24",
    number: 24,
    title: "CAP & PACELC Theorems",
    section: "Foundations",
    pillar: "Distributed Theory",
    difficulty: "Medium",
    description:
      "Why network partition (P) is inevitable in distributed systems; choosing between Consistency (CP) and Availability (AP). The PACELC extension for latency vs consistency in normal operation.",
    keyComponents: ["CAP Theorem", "PACELC", "CP vs AP", "Eventual Consistency"],
    ytVideo: "https://www.youtube.com/watch?v=k-Yaq8AHlFA",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#cap-theorem",
  },
  {
    id: "sd-25",
    number: 25,
    title: "Consistency Models (Linearizability to Eventual)",
    section: "Foundations",
    pillar: "Distributed Theory",
    difficulty: "Hard",
    description:
      "Strong consistency, Linearizability, Sequential consistency, Causal consistency, Read-your-writes, and Eventual consistency in distributed databases.",
    keyComponents: [
      "Linearizability",
      "Sequential Consistency",
      "Causal Consistency",
      "Eventual Consistency",
    ],
    ytVideo: "https://www.youtube.com/watch?v=k-Yaq8AHlFA",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#consistency-patterns",
  },
  {
    id: "sd-26",
    number: 26,
    title: "Quorum Consensus & Tunable Consistency",
    section: "Foundations",
    pillar: "Distributed Theory",
    difficulty: "Medium",
    description:
      "Strict Quorum reads and writes formula (W + R > N), Dynamo-style leaderless replication, Sloppy Quorums, Hinted Handoff, and Read Repair in Apache Cassandra.",
    keyComponents: ["Quorum", "W + R > N", "Cassandra", "Sloppy Quorum", "Read Repair"],
    ytVideo: "https://www.youtube.com/watch?v=vvhC64hQZMk",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#consistency-patterns",
  },
  {
    id: "sd-27",
    number: 27,
    title: "Consensus Protocols: Raft & Paxos",
    section: "Foundations",
    pillar: "Distributed Theory",
    difficulty: "Hard",
    description:
      "How distributed systems agree on state: Raft leader election, randomized timers, log replication, commit rule, and split-vote handling. Paxos roles (Proposer, Acceptor, Learner).",
    keyComponents: ["Raft", "Paxos", "Leader Election", "Log Replication", "Distributed Consensus"],
    ytVideo: "https://www.youtube.com/watch?v=vYp4c7o9MTg",
    referenceUrl: "https://raft.github.io/",
  },
  {
    id: "sd-28",
    number: 28,
    title: "Clocks, Ordering & Vector Clocks",
    section: "Foundations",
    pillar: "Distributed Theory",
    difficulty: "Hard",
    description:
      "Physical clocks vs NTP clock drift, Monotonic clocks, Lamport timestamps for causal ordering, and Vector Clocks for detecting concurrent write conflicts.",
    keyComponents: ["Vector Clocks", "Lamport Timestamps", "Clock Drift", "Causal Ordering"],
    ytVideo: "https://www.youtube.com/watch?v=sm4kWb_6V7E",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#consistency-patterns",
  },

  // Pillar 7: Asynchronous Messaging & Kafka
  {
    id: "sd-29",
    number: 29,
    title: "Message Queues vs Event Streams (RabbitMQ vs Kafka)",
    section: "Foundations",
    pillar: "Asynchronous Messaging",
    difficulty: "Medium",
    description:
      "Smart Broker / Dumb Consumer (RabbitMQ, SQS) vs Dumb Broker / Smart Consumer (Apache Kafka). Message acknowledgment, dead-letter queues, and pub/sub patterns.",
    keyComponents: ["Message Queue", "RabbitMQ", "Kafka", "Pub/Sub", "Event Streaming"],
    ytVideo: "https://www.youtube.com/watch?v=iJLL-KPqBpM",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#asynchronism",
  },
  {
    id: "sd-30",
    number: 30,
    title: "Apache Kafka Architecture & Partitioning",
    section: "Foundations",
    pillar: "Asynchronous Messaging",
    difficulty: "Hard",
    description:
      "Kafka topics, partitions, commit logs, producer acks (0, 1, all), consumer groups, partition rebalancing, offset storage, and log compaction for state retention.",
    keyComponents: [
      "Kafka Partitions",
      "Consumer Groups",
      "Producer Acks",
      "Offset Commit",
      "Rebalancing",
    ],
    ytVideo: "https://www.youtube.com/watch?v=iJLL-KPqBpM",
    referenceUrl: "https://kafka.apache.org/documentation/",
  },
  {
    id: "sd-31",
    number: 31,
    title: "Delivery Guarantees, Idempotency & CQRS",
    section: "Foundations",
    pillar: "Asynchronous Messaging",
    difficulty: "Hard",
    description:
      "At-most-once, At-least-once, and Exactly-once processing semantics. Idempotent producers, Dead Letter Queues (DLQ), Event Sourcing, and CQRS (Command Query Responsibility Segregation).",
    keyComponents: ["Exactly-Once", "Idempotency", "CQRS", "Event Sourcing", "Dead Letter Queue"],
    ytVideo: "https://www.youtube.com/watch?v=olfaBgJrUBI",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#asynchronism",
  },

  // Pillar 8: Reliability & Concurrency
  {
    id: "sd-32",
    number: 32,
    title: "Distributed Resilience: Circuit Breakers, Rate Limiting & Sagas",
    section: "Foundations",
    pillar: "Reliability & Concurrency",
    difficulty: "Hard",
    description:
      "Circuit Breaker pattern (Closed, Open, Half-Open), Exponential Backoff with Jitter, Token Bucket & Leaky Bucket rate limiting, Distributed Locks (Redlock), and Distributed Transactions (2PC vs Saga pattern).",
    keyComponents: [
      "Circuit Breaker",
      "Rate Limiter",
      "Redlock",
      "Saga Pattern",
      "2PC",
      "Exponential Backoff",
    ],
    ytVideo: "https://www.youtube.com/watch?v=haVp3n3u3a8",
    referenceUrl: "https://github.com/donnemartin/system-design-primer#asynchronism",
  },

  /* =========================================================================
     PART 2: HIGH-LEVEL DESIGN (HLD) CASE STUDIES (22 Classic Problems)
     ========================================================================= */

  {
    id: "sd-33",
    number: 33,
    title: "URL Shortener (TinyURL / Bitly)",
    section: "HLD",
    pillar: "Storage & Content Systems",
    difficulty: "Easy",
    description:
      "Design a high-throughput URL shortening service with Base62 encoding, Key Generation Service (KGS), 301 vs 302 redirect caching, and low-latency lookups.",
    keyComponents: ["Base62", "KGS", "Redis Cache", "301 Redirect", "PostgreSQL"],
    ytVideo: "https://www.youtube.com/watch?v=fMZMm_0ZhK4",
    referenceUrl:
      "https://github.com/donnemartin/system-design-primer/tree/master/solutions/system_design/pastebin",
  },
  {
    id: "sd-34",
    number: 34,
    title: "WhatsApp / Chat Messenger Architecture",
    section: "HLD",
    pillar: "Real-Time & Communication",
    difficulty: "Hard",
    description:
      "Design a real-time 1:1 and group chat system handling billions of messages daily with WebSockets, presence servers, Cassandra message storage, and offline push notifications.",
    keyComponents: ["WebSockets", "Cassandra", "Redis Presence", "APNS/FCM", "E2E Encryption"],
    ytVideo: "https://www.youtube.com/watch?v=vvhC64hQZMk",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-35",
    number: 35,
    title: "Tinder / Proximity Matching System",
    section: "HLD",
    pillar: "Real-Time & Communication",
    difficulty: "Medium",
    description:
      "Design a location-based recommendation and mutual match notification system using Geohashing, QuadTrees, Google S2 geometry, and fast swipe caching in Redis.",
    keyComponents: ["Geohashing", "QuadTree", "Google S2", "Redis Swipes", "Elasticsearch"],
    ytVideo: "https://www.youtube.com/watch?v=tndzLznxq40",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-36",
    number: 36,
    title: "Netflix / YouTube Video Streaming Platform",
    section: "HLD",
    pillar: "Social & Media Platforms",
    difficulty: "Hard",
    description:
      "Design a video ingestion and adaptive bitrate streaming pipeline with asynchronous transcoding DAGs (FFmpeg), CDN edge distribution, and user watch telemetry.",
    keyComponents: ["CDN", "Video Transcoding", "HLS / MPEG-DASH", "AWS S3", "Kafka Telemetry"],
    ytVideo: "https://www.youtube.com/watch?v=psQzyFfsUGU",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-37",
    number: 37,
    title: "Uber / Grab Ride-Hailing Architecture",
    section: "HLD",
    pillar: "Real-Time & Communication",
    difficulty: "Hard",
    description:
      "Design a real-time ride-hailing system ingesting continuous driver GPS locations, matching drivers with riders using Uber H3 hexagonal spatial indexing, and computing dynamic surge pricing.",
    keyComponents: ["Uber H3", "Hexagonal Grid", "Driver Telemetry", "WebSocket", "Surge Pricing"],
    ytVideo: "https://www.youtube.com/watch?v=Tp8kpMe-ZKw",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-38",
    number: 38,
    title: "BookMyShow / Movie Ticket Reservation",
    section: "HLD",
    pillar: "Concurrency & E-Commerce",
    difficulty: "Medium",
    description:
      "Design a high-concurrency ticket booking platform with temporary 10-minute seat holds, distributed locks (Redlock), optimistic DB locking, and race condition prevention.",
    keyComponents: [
      "Distributed Lock",
      "Temporary Seat Hold",
      "Optimistic Locking",
      "Redis",
      "RDBMS",
    ],
    ytVideo: "https://www.youtube.com/watch?v=lBAwJgoO3Ek",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-39",
    number: 39,
    title: "Instagram / Twitter Newsfeed System",
    section: "HLD",
    pillar: "Social & Media Platforms",
    difficulty: "Medium",
    description:
      "Design a social newsfeed with fanout-on-write (push) for regular users, fanout-on-read (pull) for high-follower celebrities, and in-memory Redis timeline caches.",
    keyComponents: [
      "Fanout-on-Write",
      "Fanout-on-Read",
      "Redis Timeline",
      "Hybrid Feed",
      "Cassandra",
    ],
    ytVideo: "https://www.youtube.com/watch?v=VJpfO6ETBbo",
    referenceUrl:
      "https://github.com/donnemartin/system-design-primer/tree/master/solutions/system_design/twitter",
  },
  {
    id: "sd-40",
    number: 40,
    title: "Google Search Autocomplete / Typeahead",
    section: "HLD",
    pillar: "Search & Infrastructure",
    difficulty: "Medium",
    description:
      "Design a sub-50ms prefix query suggestion service using in-memory Trie structures, offline frequency aggregation with MapReduce, and CDN edge caching.",
    keyComponents: ["Prefix Trie", "MapReduce", "Top-K Queries", "CDN Edge", "Sampling"],
    ytVideo: "https://www.youtube.com/watch?v=us0qySiFv08",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-41",
    number: 41,
    title: "Distributed Cache (Redis Cluster Clone)",
    section: "HLD",
    pillar: "Search & Infrastructure",
    difficulty: "Hard",
    description:
      "Design a distributed in-memory key-value cache with consistent hashing, primary-replica replication, Gossip failure detection, and memory eviction policies.",
    keyComponents: [
      "Consistent Hashing",
      "LRU Eviction",
      "Gossip Protocol",
      "Master-Slave",
      "Memory Limits",
    ],
    ytVideo: "https://www.youtube.com/watch?v=iuqZvajTOHg",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-42",
    number: 42,
    title: "Stock Exchange / Order Matching Engine",
    section: "HLD",
    pillar: "Concurrency & E-Commerce",
    difficulty: "Hard",
    description:
      "Design an ultra-low latency, microsecond-order matching engine with price-time priority (FIFO), in-memory limit order books (LOB), and zero-loss journaling for recovery.",
    keyComponents: [
      "Limit Order Book",
      "FIFO Matching",
      "Ultra-Low Latency",
      "In-Memory",
      "Journaling",
    ],
    ytVideo: "https://www.youtube.com/watch?v=dUMMM4e8t34",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-43",
    number: 43,
    title: "Distributed Rate Limiter",
    section: "HLD",
    pillar: "Search & Infrastructure",
    difficulty: "Medium",
    description:
      "Design a distributed API rate limiter using Redis with Lua scripts, sliding window counter algorithms, and local in-memory token bucket caches.",
    keyComponents: [
      "Token Bucket",
      "Sliding Window Counter",
      "Redis + Lua",
      "429 Too Many Requests",
    ],
    ytVideo: "https://www.youtube.com/watch?v=mhUQe4BKZXs",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-44",
    number: 44,
    title: "Digital Payment Gateway (Stripe / PayPal clone)",
    section: "HLD",
    pillar: "Concurrency & E-Commerce",
    difficulty: "Hard",
    description:
      "Design a resilient payment processing system with idempotency keys, double-entry bookkeeping ledger, distributed transactions using Saga orchestrator, and bank webhook retries.",
    keyComponents: [
      "Idempotency Key",
      "Double-Entry Ledger",
      "Saga Orchestrator",
      "2PC",
      "Webhook Retries",
    ],
    ytVideo: "https://www.youtube.com/watch?v=olfaBgJrUBI",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-45",
    number: 45,
    title: "Distributed Unique ID Generator (Twitter Snowflake)",
    section: "HLD",
    pillar: "Search & Infrastructure",
    difficulty: "Easy",
    description:
      "Design a 64-bit unique ID generation service using 41-bit timestamp, 10-bit worker machine ID, and 12-bit sequence numbers with NTP clock drift protection.",
    keyComponents: ["Snowflake ID", "64-bit ID", "Clock Drift", "Worker Nodes", "Sequence Counter"],
    ytVideo: "https://www.youtube.com/watch?v=sm4kWb_6V7E",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-46",
    number: 46,
    title: "Dropbox / Google Drive Cloud Storage",
    section: "HLD",
    pillar: "Storage & Content Systems",
    difficulty: "Hard",
    description:
      "Design a cloud file storage system with client-side 4MB chunking, hash-based deduplication, sync protocol, metadata DB, and block storage (S3).",
    keyComponents: [
      "File Chunking",
      "Deduplication",
      "Sync Protocol",
      "Block Storage",
      "Metadata DB",
    ],
    ytVideo: "https://www.youtube.com/watch?v=U0xTu6E2CT8",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-47",
    number: 47,
    title: "Notification System (Multi-channel: SMS, Email, Push)",
    section: "HLD",
    pillar: "Search & Infrastructure",
    difficulty: "Medium",
    description:
      "Design a scalable multi-channel notification engine with priority queues (OTP vs Marketing), user preference management, rate limiting per user, and vendor circuit breakers.",
    keyComponents: ["Priority Queues", "APNS/FCM", "Circuit Breaker", "User Preferences", "Kafka"],
    ytVideo: "https://www.youtube.com/watch?v=bBTPZ9NdSk8",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-48",
    number: 48,
    title: "Distributed Web Crawler (Google Search Crawler)",
    section: "HLD",
    pillar: "Search & Infrastructure",
    difficulty: "Hard",
    description:
      "Design a distributed web crawler with a priority & politeness URL Frontier, duplicate URL detection with Bloom Filters, SimHash content deduplication, and DNS caching.",
    keyComponents: ["URL Frontier", "Bloom Filter", "SimHash", "Robots.txt", "Politeness Delay"],
    ytVideo: "https://www.youtube.com/watch?v=BKq3bfxs_eA",
    referenceUrl:
      "https://github.com/donnemartin/system-design-primer/tree/master/solutions/system_design/web_crawler",
  },
  {
    id: "sd-49",
    number: 49,
    title: "Ad Click Aggregator & Real-Time Analytics",
    section: "HLD",
    pillar: "Concurrency & E-Commerce",
    difficulty: "Hard",
    description:
      "Design a high-throughput click tracking system with Kafka ingestion, Apache Flink 1-minute tumbling window aggregations, click fraud detection, and ClickHouse OLAP queries.",
    keyComponents: ["Kafka", "Apache Flink", "Tumbling Windows", "ClickHouse", "Fraud Detection"],
    ytVideo: "https://www.youtube.com/watch?v=KzY_K6tLz9w",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-50",
    number: 50,
    title: "Reddit / Hacker News Community Platform",
    section: "HLD",
    pillar: "Social & Media Platforms",
    difficulty: "Medium",
    description:
      "Design a community forum with nested comment trees (Closure tables), Redis buffered write counters for upvotes, and time-decay ranking algorithms.",
    keyComponents: [
      "Closure Tables",
      "Vote Counter Buffer",
      "Hot Ranking Algorithm",
      "Redis",
      "PostgreSQL",
    ],
    ytVideo: "https://www.youtube.com/watch?v=VJpfO6ETBbo",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-51",
    number: 51,
    title: "Discord Voice & Chat Infrastructure",
    section: "HLD",
    pillar: "Real-Time & Communication",
    difficulty: "Hard",
    description:
      "Design Discord's real-time messaging architecture with WebRTC voice gateway, Elixir/Erlang connection orchestrators, and lessons from Cassandra to ScyllaDB migration.",
    keyComponents: ["WebRTC", "Elixir / Erlang", "ScyllaDB", "WebSocket Gateways", "Voice Servers"],
    ytVideo: "https://www.youtube.com/watch?v=vvhC64hQZMk",
    referenceUrl: "https://discord.com/blog/how-discord-stores-trillions-of-messages",
  },
  {
    id: "sd-52",
    number: 52,
    title: "Distributed Task Scheduler (Celery / Quartz clone)",
    section: "HLD",
    pillar: "Search & Infrastructure",
    difficulty: "Medium",
    description:
      "Design a distributed scheduled job executor using Redis Sorted Sets (ZSET) indexed by execution timestamp, worker heartbeat monitoring, and leader election with etcd.",
    keyComponents: [
      "Redis ZSET",
      "Worker Pool",
      "Heartbeat Monitor",
      "Leader Election",
      "At-Least-Once",
    ],
    ytVideo: "https://www.youtube.com/watch?v=haVp3n3u3a8",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-53",
    number: 53,
    title: "Pastebin / Gist Sharing Service",
    section: "HLD",
    pillar: "Storage & Content Systems",
    difficulty: "Easy",
    description:
      "Design a text snippet sharing tool with S3 object storage for text bodies, relational metadata storage, and background workers for expiring TTL records.",
    keyComponents: ["S3 Object Storage", "TTL Cleanup Worker", "Metadata DB", "Base62"],
    ytVideo: "https://www.youtube.com/watch?v=fMZMm_0ZhK4",
    referenceUrl:
      "https://github.com/donnemartin/system-design-primer/tree/master/solutions/system_design/pastebin",
  },
  {
    id: "sd-54",
    number: 54,
    title: "Metrics & Monitoring System (Datadog / Prometheus clone)",
    section: "HLD",
    pillar: "Search & Infrastructure",
    difficulty: "Hard",
    description:
      "Design a distributed time-series metrics collection platform with pull (Prometheus) vs push (StatsD) agents, Time-Series DB (TSDB), rollup aggregations, and alert engines.",
    keyComponents: ["TSDB", "Prometheus Pull Model", "Metrics Rollups", "Alert Manager", "Grafana"],
    ytVideo: "https://www.youtube.com/watch?v=8UekgVn_yK4",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },

  /* =========================================================================
     PART 3: SOLID PRINCIPLES & DESIGN PATTERNS (30 Topics)
     ========================================================================= */

  // SOLID & Clean Architecture (6 Topics)
  {
    id: "sd-55",
    number: 55,
    title: "Single Responsibility Principle (SRP)",
    section: "Design Patterns",
    pillar: "SOLID & Clean Architecture",
    difficulty: "Easy",
    description:
      "A class should have one, and only one, reason to change. Identify God Objects, separate business logic from persistence and presentation, and improve cohesion.",
    keyComponents: ["Single Responsibility", "Cohesion", "Coupling", "Refactoring", "God Object"],
    ytVideo: "https://www.youtube.com/watch?v=kF7rQmSRlq0",
    referenceUrl: "https://refactoring.guru/solid-principles",
  },
  {
    id: "sd-56",
    number: 56,
    title: "Open-Closed Principle (OCP)",
    section: "Design Patterns",
    pillar: "SOLID & Clean Architecture",
    difficulty: "Easy",
    description:
      "Software entities should be open for extension, but closed for modification. Implement polymorphism, Strategy and Factory patterns to eliminate sprawling if-else ladders.",
    keyComponents: ["Open-Closed", "Polymorphism", "Extensibility", "Strategy Pattern"],
    ytVideo: "https://www.youtube.com/watch?v=kF7rQmSRlq0",
    referenceUrl: "https://refactoring.guru/solid-principles",
  },
  {
    id: "sd-57",
    number: 57,
    title: "Liskov Substitution Principle (LSP)",
    section: "Design Patterns",
    pillar: "SOLID & Clean Architecture",
    difficulty: "Medium",
    description:
      "Subtypes must be substitutable for their base types without altering correctness. Understand the classic Rectangle vs Square violation, the Flightless Bird problem, and contract preservation.",
    keyComponents: ["Liskov Substitution", "Subtyping", "Invariance", "Behavioral Compatibility"],
    ytVideo: "https://www.youtube.com/watch?v=kF7rQmSRlq0",
    referenceUrl: "https://refactoring.guru/solid-principles",
  },
  {
    id: "sd-58",
    number: 58,
    title: "Interface Segregation Principle (ISP)",
    section: "Design Patterns",
    pillar: "SOLID & Clean Architecture",
    difficulty: "Easy",
    description:
      "Clients should not be forced to depend on methods they do not use. Decompose fat interfaces into focused, role-specific interfaces (e.g. Printer, Scanner, FaxMachine).",
    keyComponents: [
      "Interface Segregation",
      "Role Interfaces",
      "Fat Interface Smell",
      "Decoupling",
    ],
    ytVideo: "https://www.youtube.com/watch?v=kF7rQmSRlq0",
    referenceUrl: "https://refactoring.guru/solid-principles",
  },
  {
    id: "sd-59",
    number: 59,
    title: "Dependency Inversion Principle (DIP)",
    section: "Design Patterns",
    pillar: "SOLID & Clean Architecture",
    difficulty: "Medium",
    description:
      "High-level modules should not depend on low-level modules; both should depend on abstractions. Dependency Injection (Constructor, Setter), IoC Containers, and decoupling from concrete implementations.",
    keyComponents: [
      "Dependency Inversion",
      "Dependency Injection",
      "IoC",
      "Abstraction",
      "Decoupling",
    ],
    ytVideo: "https://www.youtube.com/watch?v=kF7rQmSRlq0",
    referenceUrl: "https://refactoring.guru/solid-principles",
  },
  {
    id: "sd-60",
    number: 60,
    title: "OOP Principles & Clean Code Fundamentals",
    section: "Design Patterns",
    pillar: "SOLID & Clean Architecture",
    difficulty: "Easy",
    description:
      "Encapsulation, Abstraction, Inheritance vs Composition ('Favor Composition over Inheritance'), DRY (Don't Repeat Yourself), KISS (Keep It Simple), and YAGNI (You Aren't Gonna Need It).",
    keyComponents: ["Encapsulation", "Composition over Inheritance", "DRY", "KISS", "YAGNI"],
    ytVideo: "https://www.youtube.com/watch?v=1bZp_y5ZgFc",
    referenceUrl: "https://refactoring.guru/",
  },

  // Creational Design Patterns (5 Topics)
  {
    id: "sd-61",
    number: 61,
    title: "Singleton Pattern (Thread-Safe & Bill Pugh)",
    section: "Design Patterns",
    pillar: "Creational Patterns",
    difficulty: "Easy",
    description:
      "Ensure a class has only one instance and provide a global point of access. Eager vs Lazy initialization, Double-Checked Locking with volatile, Bill Pugh static inner class, and Enum singleton.",
    keyComponents: [
      "Singleton",
      "Double-Checked Locking",
      "volatile",
      "Bill Pugh",
      "Thread Safety",
    ],
    ytVideo: "https://www.youtube.com/watch?v=tSZn4ojT9e8",
    referenceUrl: "https://refactoring.guru/design-patterns/singleton",
  },
  {
    id: "sd-62",
    number: 62,
    title: "Factory Method Pattern",
    section: "Design Patterns",
    pillar: "Creational Patterns",
    difficulty: "Easy",
    description:
      "Define an interface for creating an object, but let subclasses decide which class to instantiate. Decouples object creation from business logic (e.g. Logistics: Truck vs Ship).",
    keyComponents: ["Factory Method", "Virtual Constructor", "Creator Class", "Polymorphism"],
    ytVideo: "https://www.youtube.com/watch?v=EcFVTgRHJLM",
    referenceUrl: "https://refactoring.guru/design-patterns/factory-method",
  },
  {
    id: "sd-63",
    number: 63,
    title: "Abstract Factory Pattern",
    section: "Design Patterns",
    pillar: "Creational Patterns",
    difficulty: "Medium",
    description:
      "Provide an interface for creating families of related or dependent objects without specifying concrete classes (e.g. Cross-platform UI toolkit: Mac vs Windows Button and Checkbox).",
    keyComponents: ["Abstract Factory", "Product Families", "Factory of Factories", "GUI Toolkits"],
    ytVideo: "https://www.youtube.com/watch?v=v-GiuMmsXuk",
    referenceUrl: "https://refactoring.guru/design-patterns/abstract-factory",
  },
  {
    id: "sd-64",
    number: 64,
    title: "Builder Pattern",
    section: "Design Patterns",
    pillar: "Creational Patterns",
    difficulty: "Easy",
    description:
      "Separate the construction of a complex object from its representation so that the same construction process can create different representations. Avoids telescoping constructors and ensures immutability.",
    keyComponents: ["Builder", "Fluent API", "Method Chaining", "Immutability", "Director"],
    ytVideo: "https://www.youtube.com/watch?v=M7Xi1yO_584",
    referenceUrl: "https://refactoring.guru/design-patterns/builder",
  },
  {
    id: "sd-65",
    number: 65,
    title: "Prototype Pattern (Object Cloning)",
    section: "Design Patterns",
    pillar: "Creational Patterns",
    difficulty: "Medium",
    description:
      "Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype. Shallow copy vs Deep copy, and Prototype Registry management.",
    keyComponents: ["Prototype", "Cloning", "Deep Copy", "Shallow Copy", "Prototype Registry"],
    ytVideo: "https://www.youtube.com/watch?v=DcFh_Fw5vW8",
    referenceUrl: "https://refactoring.guru/design-patterns/prototype",
  },

  // Structural Design Patterns (7 Topics)
  {
    id: "sd-66",
    number: 66,
    title: "Adapter Pattern",
    section: "Design Patterns",
    pillar: "Structural Patterns",
    difficulty: "Easy",
    description:
      "Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces (e.g. Legacy XML to modern JSON API).",
    keyComponents: ["Adapter", "Wrapper", "Interface Conversion", "Legacy Integration"],
    ytVideo: "https://www.youtube.com/watch?v=2PKQtNXSEvA",
    referenceUrl: "https://refactoring.guru/design-patterns/adapter",
  },
  {
    id: "sd-67",
    number: 67,
    title: "Decorator Pattern",
    section: "Design Patterns",
    pillar: "Structural Patterns",
    difficulty: "Medium",
    description:
      "Attach additional responsibilities to an object dynamically without subclassing. Decorators provide a flexible alternative to subclassing for extending functionality (e.g. Beverage add-ons, Java I/O streams).",
    keyComponents: ["Decorator", "Wrapper", "Dynamic Extension", "Open-Closed", "Java I/O"],
    ytVideo: "https://www.youtube.com/watch?v=GCraGHx6gso",
    referenceUrl: "https://refactoring.guru/design-patterns/decorator",
  },
  {
    id: "sd-68",
    number: 68,
    title: "Facade Pattern",
    section: "Design Patterns",
    pillar: "Structural Patterns",
    difficulty: "Easy",
    description:
      "Provide a unified, simplified high-level interface to a set of interfaces in a complex subsystem (e.g. E-Commerce One-Click Order Facade coordinating Inventory, Payment, and Shipping).",
    keyComponents: ["Facade", "Simplified Interface", "Subsystem Decoupling", "Orchestration"],
    ytVideo: "https://www.youtube.com/watch?v=K4FkHVO5iac",
    referenceUrl: "https://refactoring.guru/design-patterns/facade",
  },
  {
    id: "sd-69",
    number: 69,
    title: "Proxy Pattern (Virtual, Protection, Remote)",
    section: "Design Patterns",
    pillar: "Structural Patterns",
    difficulty: "Medium",
    description:
      "Provide a surrogate or placeholder for another object to control access to it. Implement Virtual Proxy (lazy initialization), Protection Proxy (access control / RBAC), and Remote Proxy (RPC stubs).",
    keyComponents: ["Proxy", "Virtual Proxy", "Protection Proxy", "Lazy Loading", "Access Control"],
    ytVideo: "https://www.youtube.com/watch?v=NwaabHqPVuM",
    referenceUrl: "https://refactoring.guru/design-patterns/proxy",
  },
  {
    id: "sd-70",
    number: 70,
    title: "Composite Pattern",
    section: "Design Patterns",
    pillar: "Structural Patterns",
    difficulty: "Medium",
    description:
      "Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly (e.g. File System: File and Directory).",
    keyComponents: ["Composite", "Tree Hierarchy", "Uniform Interface", "Part-Whole"],
    ytVideo: "https://www.youtube.com/watch?v=EWDmWbJ44mM",
    referenceUrl: "https://refactoring.guru/design-patterns/composite",
  },
  {
    id: "sd-71",
    number: 71,
    title: "Bridge Pattern",
    section: "Design Patterns",
    pillar: "Structural Patterns",
    difficulty: "Hard",
    description:
      "Decouple an abstraction from its implementation so that the two can vary independently. Prevents cartesian product class explosion (e.g. Shapes with Rendering APIs: Vector vs Raster).",
    keyComponents: ["Bridge", "Abstraction vs Implementation", "Decoupling", "Class Explosion Fix"],
    ytVideo: "https://www.youtube.com/watch?v=F1YQ7YRjttI",
    referenceUrl: "https://refactoring.guru/design-patterns/bridge",
  },
  {
    id: "sd-72",
    number: 72,
    title: "Flyweight Pattern",
    section: "Design Patterns",
    pillar: "Structural Patterns",
    difficulty: "Hard",
    description:
      "Use sharing to support large numbers of fine-grained objects efficiently by separating intrinsic immutable state from extrinsic context-dependent state (e.g. Word processor character glyphs, Game particle trees).",
    keyComponents: [
      "Flyweight",
      "Memory Optimization",
      "Intrinsic vs Extrinsic State",
      "Object Sharing",
    ],
    ytVideo: "https://www.youtube.com/watch?v=0vV-R2876U8",
    referenceUrl: "https://refactoring.guru/design-patterns/flyweight",
  },

  // Behavioral Design Patterns (8 Topics)
  {
    id: "sd-73",
    number: 73,
    title: "Strategy Pattern",
    section: "Design Patterns",
    pillar: "Behavioral Patterns",
    difficulty: "Easy",
    description:
      "Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it (e.g. Payment: CreditCard, PayPal, Crypto).",
    keyComponents: ["Strategy", "Interchangeable Algorithms", "Polymorphism", "Open-Closed"],
    ytVideo: "https://www.youtube.com/watch?v=v9ejT8FO-7I",
    referenceUrl: "https://refactoring.guru/design-patterns/strategy",
  },
  {
    id: "sd-74",
    number: 74,
    title: "Observer Pattern (Pub-Sub at Class Level)",
    section: "Design Patterns",
    pillar: "Behavioral Patterns",
    difficulty: "Easy",
    description:
      "Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically (e.g. Event Listeners, Stock ticker, Notification broker).",
    keyComponents: ["Observer", "Subject / Observable", "Event Dispatcher", "Loose Coupling"],
    ytVideo: "https://www.youtube.com/watch?v=-_OK_8Ujb9g",
    referenceUrl: "https://refactoring.guru/design-patterns/observer",
  },
  {
    id: "sd-75",
    number: 75,
    title: "State Pattern",
    section: "Design Patterns",
    pillar: "Behavioral Patterns",
    difficulty: "Medium",
    description:
      "Allow an object to alter its behavior when its internal state changes; the object will appear to change its class. Clean state transitions without nested switch statements (e.g. Vending machine, Order lifecycle).",
    keyComponents: ["State Pattern", "State Machine", "Transitions", "Context Class"],
    ytVideo: "https://www.youtube.com/watch?v=N12L5D78MAA",
    referenceUrl: "https://refactoring.guru/design-patterns/state",
  },
  {
    id: "sd-76",
    number: 76,
    title: "Command Pattern (Undo / Redo)",
    section: "Design Patterns",
    pillar: "Behavioral Patterns",
    difficulty: "Medium",
    description:
      "Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations (e.g. Remote control, Transaction logs, Editor undo).",
    keyComponents: ["Command", "Invoker", "Receiver", "Undo / Redo", "Queueing Requests"],
    ytVideo: "https://www.youtube.com/watch?v=9qA5kw8dcSU",
    referenceUrl: "https://refactoring.guru/design-patterns/command",
  },
  {
    id: "sd-77",
    number: 77,
    title: "Chain of Responsibility Pattern",
    section: "Design Patterns",
    pillar: "Behavioral Patterns",
    difficulty: "Medium",
    description:
      "Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along the chain (e.g. Middleware filters, ATM dispenser, Loggers).",
    keyComponents: ["Chain of Responsibility", "Handler", "Middleware", "Sequential Processing"],
    ytVideo: "https://www.youtube.com/watch?v=FafNcoBvVp8",
    referenceUrl: "https://refactoring.guru/design-patterns/chain-of-responsibility",
  },
  {
    id: "sd-78",
    number: 78,
    title: "Template Method Pattern",
    section: "Design Patterns",
    pillar: "Behavioral Patterns",
    difficulty: "Easy",
    description:
      "Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.",
    keyComponents: ["Template Method", "Algorithm Skeleton", "Hook Methods", "Hollywood Principle"],
    ytVideo: "https://www.youtube.com/watch?v=7ocpwK9tssw",
    referenceUrl: "https://refactoring.guru/design-patterns/template-method",
  },
  {
    id: "sd-79",
    number: 79,
    title: "Iterator Pattern",
    section: "Design Patterns",
    pillar: "Behavioral Patterns",
    difficulty: "Easy",
    description:
      "Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation (e.g. Custom Tree In-order/Level-order Iterator, Collection iterator).",
    keyComponents: ["Iterator", "Iterable", "hasNext()", "next()", "Traversal Encapsulation"],
    ytVideo: "https://www.youtube.com/watch?v=uNTNEwqq_eM",
    referenceUrl: "https://refactoring.guru/design-patterns/iterator",
  },
  {
    id: "sd-80",
    number: 80,
    title: "Mediator Pattern",
    section: "Design Patterns",
    pillar: "Behavioral Patterns",
    difficulty: "Medium",
    description:
      "Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, letting you vary their interaction independently (e.g. Air Traffic Controller, Chat Room).",
    keyComponents: ["Mediator", "Decoupling", "Hub and Spoke", "Chat Room"],
    ytVideo: "https://www.youtube.com/watch?v=8DxIpdKd41A",
    referenceUrl: "https://refactoring.guru/design-patterns/mediator",
  },

  // Concurrency & Multithreading Patterns (4 Topics)
  {
    id: "sd-81",
    number: 81,
    title: "Producer-Consumer Pattern (Bounded BlockingQueue)",
    section: "Design Patterns",
    pillar: "Concurrency Patterns",
    difficulty: "Medium",
    description:
      "Design a thread-safe bounded buffer using wait/notify, ReentrantLock, and Condition variables. Handle buffer full and empty conditions cleanly without busy-waiting.",
    keyComponents: [
      "Producer-Consumer",
      "BlockingQueue",
      "ReentrantLock",
      "Condition",
      "wait/notify",
    ],
    ytVideo: "https://www.youtube.com/watch?v=UOr9kMCCa5g",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-82",
    number: 82,
    title: "Thread Pool & Executor Service Design",
    section: "Design Patterns",
    pillar: "Concurrency Patterns",
    difficulty: "Hard",
    description:
      "Implement an in-memory ThreadPool with worker threads, bounded blocking task queue, lifecycle states (Running, Shutdown, Terminated), and rejection policies (Abort, CallerRuns, Discard).",
    keyComponents: [
      "ThreadPool",
      "Worker Threads",
      "Task Queue",
      "Rejection Policies",
      "Lifecycle",
    ],
    ytVideo: "https://www.youtube.com/watch?v=s4ms_d18c1E",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-83",
    number: 83,
    title: "Read-Write Lock Pattern",
    section: "Design Patterns",
    pillar: "Concurrency Patterns",
    difficulty: "Medium",
    description:
      "Implement a Reader-Writer lock allowing concurrent reads when no write is active, while enforcing exclusive access for writes. Solve writer starvation with fairness queues.",
    keyComponents: ["ReadWriteLock", "Mutual Exclusion", "Fair Lock", "Writer Starvation"],
    ytVideo: "https://www.youtube.com/watch?v=UOr9kMCCa5g",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-84",
    number: 84,
    title: "Deadlock Detection & Prevention (Coffman Conditions)",
    section: "Design Patterns",
    pillar: "Concurrency Patterns",
    difficulty: "Hard",
    description:
      "The 4 Coffman conditions for deadlocks (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait). Deadlock prevention via strict lock ordering and tryLock with timeouts.",
    keyComponents: [
      "Deadlock",
      "Coffman Conditions",
      "Lock Ordering",
      "tryLock",
      "Resource Allocation Graph",
    ],
    ytVideo: "https://www.youtube.com/watch?v=UOr9kMCCa5g",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },

  /* =========================================================================
     PART 4: LOW-LEVEL DESIGN (LLD) & MACHINE CODING (23 Classic Problems)
     ========================================================================= */

  {
    id: "sd-85",
    number: 85,
    title: "Parking Lot System (LLD)",
    section: "LLD",
    pillar: "Object-Oriented Design",
    difficulty: "Easy",
    description:
      "Design a multi-floor parking lot supporting different vehicle types (Bike, Car, Truck), parking spot allocation strategies, entry/exit gates, and dynamic pricing models.",
    keyComponents: ["Strategy Pattern", "Inheritance", "Slot Allocation", "Fee Calculator"],
    ytVideo: "https://www.youtube.com/watch?v=tVRyb4HaHgw",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-86",
    number: 86,
    title: "Elevator System / Dispatcher (LLD)",
    section: "LLD",
    pillar: "Object-Oriented Design",
    difficulty: "Medium",
    description:
      "Design an elevator controller managing multiple elevator cars, request dispatching algorithms (SCAN / LOOK), and elevator state transitions (Idle, Moving Up, Moving Down).",
    keyComponents: ["State Pattern", "SCAN Algorithm", "Elevator Controller", "Dispatcher"],
    ytVideo: "https://www.youtube.com/watch?v=siqiJAJWUVg",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-87",
    number: 87,
    title: "Splitwise Expense Sharing Application (LLD)",
    section: "LLD",
    pillar: "Object-Oriented Design",
    difficulty: "Medium",
    description:
      "Design an expense sharing app supporting Equal, Exact, and Percentage splits, group expense tracking, and the Min-Cash-Flow debt simplification algorithm.",
    keyComponents: [
      "Strategy Pattern",
      "Debt Simplification Graph",
      "Split Models",
      "User Balances",
    ],
    ytVideo: "https://www.youtube.com/watch?v=ro_g7_hKj80",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-88",
    number: 88,
    title: "In-Memory LRU / LFU Cache (LLD)",
    section: "LLD",
    pillar: "Object-Oriented Design",
    difficulty: "Medium",
    description:
      "Implement a thread-safe, generic in-memory cache with O(1) get/put operations using a Doubly Linked List and HashMap, with pluggable eviction policies.",
    keyComponents: [
      "Doubly Linked List",
      "HashMap",
      "ReadWriteLock",
      "Strategy Pattern",
      "O(1) Operations",
    ],
    ytVideo: "https://www.youtube.com/watch?v=S6XhW86P_A0",
    referenceUrl: "https://leetcode.com/problems/lru-cache/",
  },
  {
    id: "sd-89",
    number: 89,
    title: "Snake and Ladder Game (LLD)",
    section: "LLD",
    pillar: "Interactive Games",
    difficulty: "Easy",
    description:
      "Design an extensible Snake and Ladder game board with customizable snakes, ladders, dice rollers, player turn queue, and win condition checking.",
    keyComponents: ["Game Loop", "Queue", "Dice Entity", "Board Model"],
    ytVideo: "https://www.youtube.com/watch?v=73rn5b2t_0s",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-90",
    number: 90,
    title: "Chess Game (LLD)",
    section: "LLD",
    pillar: "Interactive Games",
    difficulty: "Hard",
    description:
      "Design an object-oriented chess game with board state, piece inheritance with polymorphic movement validation, turn tracking, checkmate detection, and move logs.",
    keyComponents: ["Strategy Pattern", "Piece Polymorphism", "Board State", "Move Validator"],
    ytVideo: "https://www.youtube.com/watch?v=H76i1_Vd_aY",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-91",
    number: 91,
    title: "Tic-Tac-Toe Game (N x N Extensible) (LLD)",
    section: "LLD",
    pillar: "Interactive Games",
    difficulty: "Easy",
    description:
      "Design an N x N Tic-Tac-Toe board for K players with O(1) row/column/diagonal win-checking using prefix counting counters.",
    keyComponents: ["O(1) Win Check", "Board Abstraction", "Turn Manager", "Piece Model"],
    ytVideo: "https://www.youtube.com/watch?v=73rn5b2t_0s",
    referenceUrl: "https://leetcode.com/problems/design-tic-tac-toe/",
  },
  {
    id: "sd-92",
    number: 92,
    title: "Cricbuzz Live Cricket Match Scoring (LLD)",
    section: "LLD",
    pillar: "Object-Oriented Design",
    difficulty: "Medium",
    description:
      "Design a live cricket match scoring system with match state, over and ball events, and the Observer pattern pushing real-time score updates to display boards.",
    keyComponents: ["Observer Pattern", "Match State", "Ball Event", "Scoreboard Subscribers"],
    ytVideo: "https://www.youtube.com/watch?v=b4N8vIovvI4",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-93",
    number: 93,
    title: "Rate Limiter Library (SDK Level) (LLD)",
    section: "LLD",
    pillar: "Object-Oriented Design",
    difficulty: "Medium",
    description:
      "Implement a reusable client-side and middleware rate limiter library in code using the Token Bucket and Sliding Window algorithms with pluggable storage backends.",
    keyComponents: ["Token Bucket", "Sliding Window", "Middleware Pattern", "Storage Adapter"],
    ytVideo: "https://www.youtube.com/watch?v=mhUQe4BKZXs",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-94",
    number: 94,
    title: "Pub-Sub In-Memory Messaging Queue (LLD)",
    section: "LLD",
    pillar: "Object-Oriented Design",
    difficulty: "Hard",
    description:
      "Design an in-memory message broker with topics, consumer group subscriptions, thread-safe message publishing, and offset tracking per consumer.",
    keyComponents: ["Observer Pattern", "Thread Pool", "Topic / Partition", "Offset Tracking"],
    ytVideo: "https://www.youtube.com/watch?v=iJLL-KPqBpM",
    referenceUrl: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "sd-95",
    number: 95,
    title: "Coffee Vending Machine / Pizza Store (LLD)",
    section: "LLD",
    pillar: "Object-Oriented Design",
    difficulty: "Easy",
    description:
      "Design a beverage dispenser using the classic Decorator pattern for add-ons (Milk, Sugar, Syrup) and the State pattern for payment, brewing, and dispensing states.",
    keyComponents: ["Decorator Pattern", "State Pattern", "Inventory Manager", "Payment Adapter"],
    ytVideo: "https://www.youtube.com/watch?v=tVRyb4HaHgw",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-96",
    number: 96,
    title: "ATM Machine System (LLD)",
    section: "LLD",
    pillar: "Object-Oriented Design",
    difficulty: "Medium",
    description:
      "Design an automated teller machine (ATM) using the State pattern (Idle, CardInserted, PinVerified, CashDispensing) and Chain of Responsibility for cash denominations.",
    keyComponents: [
      "State Pattern",
      "Chain of Responsibility",
      "Cash Dispenser",
      "Bank Account Proxy",
    ],
    ytVideo: "https://www.youtube.com/watch?v=haVp3n3u3a8",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-97",
    number: 97,
    title: "Movie Ticket Booking System (LLD)",
    section: "LLD",
    pillar: "Object-Oriented Design",
    difficulty: "Medium",
    description:
      "Object-oriented design for cinema hall seat layouts, show timings, temporary seat lock mutexes, and payment state machines.",
    keyComponents: ["Seat Lock Mutex", "Cinema Layout", "State Pattern", "Show Booking"],
    ytVideo: "https://www.youtube.com/watch?v=lBAwJgoO3Ek",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-98",
    number: 98,
    title: "Food Delivery Platform (Swiggy / Zomato LLD)",
    section: "LLD",
    pillar: "Real-World Machine Coding",
    difficulty: "Hard",
    description:
      "Design a food ordering system with restaurant menus, cart items, delivery partner assignment strategies, and order status state machines.",
    keyComponents: [
      "Strategy Pattern",
      "State Machine",
      "Delivery Matcher",
      "Cart Entity",
      "Observer Pattern",
    ],
    ytVideo: "https://www.youtube.com/watch?v=8cptn_U6d0s",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-99",
    number: 99,
    title: "Ride-Sharing Platform (Uber / Ola LLD)",
    section: "LLD",
    pillar: "Real-World Machine Coding",
    difficulty: "Hard",
    description:
      "Design a ride booking app with Rider, Driver, Trip, Driver matching strategies (Nearest driver vs Highest rating), and Fare calculation strategies.",
    keyComponents: [
      "Strategy Pattern",
      "Trip Lifecycle",
      "Surge Pricing Strategy",
      "Observer Pattern",
    ],
    ytVideo: "https://www.youtube.com/watch?v=Tp8kpMe-ZKw",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-100",
    number: 100,
    title: "Amazon / Flipkart Shopping Cart & Checkout (LLD)",
    section: "LLD",
    pillar: "Real-World Machine Coding",
    difficulty: "Medium",
    description:
      "Design e-commerce checkout with coupon code discount strategies (Flat, Percentage, Buy 1 Get 1), inventory reservation, and payment adapter integrations.",
    keyComponents: ["Composite Pattern", "Strategy Pattern", "Inventory Lock", "Coupon Evaluator"],
    ytVideo: "https://www.youtube.com/watch?v=ro_g7_hKj80",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-101",
    number: 101,
    title: "Truecaller / Contact Directory Search (LLD)",
    section: "LLD",
    pillar: "Real-World Machine Coding",
    difficulty: "Medium",
    description:
      "Design a contact directory with Trie-based prefix name lookups, phone number hash search, spam rating aggregation, and LRU search cache.",
    keyComponents: ["Trie Data Structure", "Spam Scoring", "HashMap Index", "LRU Cache"],
    ytVideo: "https://www.youtube.com/watch?v=D4U7kS9yXJw",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-102",
    number: 102,
    title: "Meeting Scheduler / Google Calendar (LLD)",
    section: "LLD",
    pillar: "Real-World Machine Coding",
    difficulty: "Medium",
    description:
      "Design a calendar meeting scheduler supporting meeting rooms, user schedules, time interval overlap detection, and recurring meeting generation.",
    keyComponents: [
      "Interval Tree",
      "Conflict Detector",
      "Room Allocation Strategy",
      "Observer Pattern",
    ],
    ytVideo: "https://www.youtube.com/watch?v=x_m_uJ04kQ4",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-103",
    number: 103,
    title: "Hotel Management & Room Booking System (LLD)",
    section: "LLD",
    pillar: "Real-World Machine Coding",
    difficulty: "Medium",
    description:
      "Design a hotel reservation system with room types, housekeeping status state machine, check-in/check-out workflow, and dynamic pricing models.",
    keyComponents: ["State Pattern", "Room Inventory", "Pricing Strategy", "Reservation Validator"],
    ytVideo: "https://www.youtube.com/watch?v=tVRyb4HaHgw",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-104",
    number: 104,
    title: "Linux File System Design (LLD)",
    section: "LLD",
    pillar: "Real-World Machine Coding",
    difficulty: "Hard",
    description:
      "Design an in-memory Unix file system using the Composite pattern for File and Directory nodes, permission bitmasks, path parsing, and size filtering.",
    keyComponents: [
      "Composite Pattern",
      "Inode Structure",
      "Path Resolution",
      "Permission Bitmask",
    ],
    ytVideo: "https://www.youtube.com/watch?v=EWDmWbJ44mM",
    referenceUrl: "https://leetcode.com/problems/design-in-memory-file-system/",
  },
  {
    id: "sd-105",
    number: 105,
    title: "Logging Framework (Log4j Clone LLD)",
    section: "LLD",
    pillar: "Real-World Machine Coding",
    difficulty: "Medium",
    description:
      "Design an extensible logging library using Chain of Responsibility for log levels (INFO, DEBUG, ERROR), Appender/Sink implementations (Console, File), and async log buffers.",
    keyComponents: [
      "Chain of Responsibility",
      "Appender Interface",
      "Async Buffer",
      "Singleton Pattern",
    ],
    ytVideo: "https://www.youtube.com/watch?v=FafNcoBvVp8",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-106",
    number: 106,
    title: "Task Planner / Jira Sprint Board (LLD)",
    section: "LLD",
    pillar: "Real-World Machine Coding",
    difficulty: "Medium",
    description:
      "Design a project task board with Tasks, User Stories, Epics, Sprints, status transition state machine, and change notification observers.",
    keyComponents: ["State Pattern", "Observer Pattern", "Composite Tasks", "Sprint Manager"],
    ytVideo: "https://www.youtube.com/watch?v=ro_g7_hKj80",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
  {
    id: "sd-107",
    number: 107,
    title: "Vending Machine Complete Machine Coding (LLD)",
    section: "LLD",
    pillar: "Real-World Machine Coding",
    difficulty: "Medium",
    description:
      "Full state machine design for a coin/cash vending machine (NoMoney, HasMoney, Dispensing, Refunding), inventory slots, and minimum change return algorithm.",
    keyComponents: [
      "State Pattern",
      "Coin Change Algorithm",
      "Inventory Manager",
      "Refund Handler",
    ],
    ytVideo: "https://www.youtube.com/watch?v=tVRyb4HaHgw",
    referenceUrl: "https://github.com/tssovi/grokking-the-object-oriented-design-interview",
  },
];

export const getSystemDesignPillarGroups = (): SystemDesignPillarGroup[] => {
  const map = new Map<string, SystemDesignPillarGroup>();

  systemDesignProblems.forEach((prob) => {
    const key = `${prob.section}::${prob.pillar}`;
    if (!map.has(key)) {
      map.set(key, {
        id: `sd-group-${map.size + 1}`,
        name: prob.pillar,
        section: prob.section,
        problems: [],
      });
    }
    map.get(key)!.problems.push(prob);
  });

  return Array.from(map.values());
};

export const getSystemDesignStats = (
  solvedProblemIds: string[] = [],
  starredProblemIds: string[] = [],
) => {
  const solvedSet = new Set(solvedProblemIds);
  const starredSet = new Set(starredProblemIds);

  const total = systemDesignProblems.length;
  const solved = systemDesignProblems.filter((p) => solvedSet.has(p.id)).length;
  const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;

  const easyTotal = systemDesignProblems.filter((p) => p.difficulty === "Easy").length;
  const easySolved = systemDesignProblems.filter(
    (p) => p.difficulty === "Easy" && solvedSet.has(p.id),
  ).length;

  const medTotal = systemDesignProblems.filter((p) => p.difficulty === "Medium").length;
  const medSolved = systemDesignProblems.filter(
    (p) => p.difficulty === "Medium" && solvedSet.has(p.id),
  ).length;

  const hardTotal = systemDesignProblems.filter((p) => p.difficulty === "Hard").length;
  const hardSolved = systemDesignProblems.filter(
    (p) => p.difficulty === "Hard" && solvedSet.has(p.id),
  ).length;

  const starredCount = systemDesignProblems.filter((p) => starredSet.has(p.id)).length;

  const foundationsTotal = systemDesignProblems.filter((p) => p.section === "Foundations").length;
  const foundationsSolved = systemDesignProblems.filter(
    (p) => p.section === "Foundations" && solvedSet.has(p.id),
  ).length;

  const hldTotal = systemDesignProblems.filter((p) => p.section === "HLD").length;
  const hldSolved = systemDesignProblems.filter(
    (p) => p.section === "HLD" && solvedSet.has(p.id),
  ).length;

  const patternsTotal = systemDesignProblems.filter((p) => p.section === "Design Patterns").length;
  const patternsSolved = systemDesignProblems.filter(
    (p) => p.section === "Design Patterns" && solvedSet.has(p.id),
  ).length;

  const lldTotal = systemDesignProblems.filter((p) => p.section === "LLD").length;
  const lldSolved = systemDesignProblems.filter(
    (p) => p.section === "LLD" && solvedSet.has(p.id),
  ).length;

  return {
    total,
    solved,
    percentage,
    easyTotal,
    easySolved,
    medTotal,
    medSolved,
    hardTotal,
    hardSolved,
    starredCount,
    foundationsTotal,
    foundationsSolved,
    hldTotal,
    hldSolved,
    patternsTotal,
    patternsSolved,
    lldTotal,
    lldSolved,
  };
};

export const getAllSystemDesignProblems = () => systemDesignProblems;
