# Database Development Naming Convention
## 1. Table Naming Convention
- Use lowercase letters with underscores (snake_case).
- Table names should be in plural form to represent data collections.
- Table in the same business domain need to have the same prefix (eg, **health_news**, **health_news_tags**).
- Avoid arbitrary abbreviations unles they are industry standard (eg, **id**, **sku**).
- Many-to-many relationship tables should be named using the tableA_tableB format.
- Non-tool tables should all have **created_at** and **updated_at**

## 2. Column Naming Convention
- Use lowercase letters with underscores (snake_case).
- Column names must be descriptive and avoid meaningless abbreviations.
- Primary key columns should always be named **id**.
- Foreign key columns should be prefixed with the referenced table name (eg, **user_id**, **recipes_id**).
- Boolean fileds should start with **is_** (eg, **is_active**)
- Timestamp fields should end with **_at** (eg, **created_at**, **updated_at**)
- Monetary fields should use unit suffixes (eg, **price_cents**)
- Quantity fields should have clear unit suffixes (eg, **food_quantity**)

## 3. Index Naming Convention
- Index naming format:
    - Regular index: **idx_table_column**
    - Primary index: **pk_table_column**
    - Unique index: **uniq_table_column**
- Composite indexes should include all columns in order in the index name
- Index names should be as short as possible while maintaining readability

## 4. Additional Conventions
- Talbe and column comments must be provided to describe their purpose.
- Reserve an **extra_info** column for extensibility
- Avoid using reserved SQL keywords as table or column names (eg, **user**, **order**), use prefixes if necessary.