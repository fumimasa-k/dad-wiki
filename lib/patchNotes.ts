import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const NOTES_DIR = path.join(process.cwd(), "content", "patch-notes");

function listNoteFiles() {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

function readNoteFileBySlug(slug: string): { raw: string } | null {
  const md = path.join(NOTES_DIR, `${slug}.md`);
  const mdx = path.join(NOTES_DIR, `${slug}.mdx`);

  if (fs.existsSync(md)) return { raw: fs.readFileSync(md, "utf-8") };
  if (fs.existsSync(mdx)) return { raw: fs.readFileSync(mdx, "utf-8") };
  return null;
}

export type PatchNoteMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  tags?: string[];
  summary?: string;
};

export type PatchNote = PatchNoteMeta & {
  content: string; // markdown
};

export function getAllPatchNotesMeta(): PatchNoteMeta[] {
  const files = listNoteFiles();

  const list = files.map((filename) => {
    const slug = filename.replace(/\.mdx?$/, "");
    const full = fs.readFileSync(path.join(NOTES_DIR, filename), "utf-8");
    const { data } = matter(full);

    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? "1970-01-01"),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      summary: data.summary ? String(data.summary) : ""
    };
  });

  list.sort((a, b) => (a.date < b.date ? 1 : -1));
  return list;
}

export function getPatchNoteBySlug(slug: string): PatchNote | null {
  const hit = readNoteFileBySlug(slug);
  if (!hit) return null;

  const { data, content } = matter(hit.raw);

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? "1970-01-01"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    summary: data.summary ? String(data.summary) : "",
    content
  };
}