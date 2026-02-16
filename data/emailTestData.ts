
export const validEmailTestCases = [
    { email: `valid.email+${Date.now()}@example.com`, description: 'Standard valid email' },
    { email: `user+tag+${Date.now()}@domain.co.uk`, description: 'Plus alias and country TLD' },
    { email: `test.email+${Date.now()}@subdomain.example.com`, description: 'Subdomain email' },
    { email: `USER+${Date.now()}@DOMAIN.COM`, description: 'Uppercase email' },
    { email: `a+${Date.now()}@b.co`, description: 'Minimal valid email' },
    { email: `user+${Date.now()}@123-domain.com`, description: 'Numeric and hyphen domain' },
    { email: `user+${Date.now()}@domain.technology`, description: 'Long TLD' },
    {
        email: `${'a'.repeat(64 - 6)}+${Date.now()}@domain.com`, // Keep max length in mind
        description: 'Max local part length (64 chars)',
    },
    { email: ` user${Date.now()}@domain.com`, description: 'Leading space removed & unique' },
    { email: `user${Date.now()}@domain.com `, description: 'Trailing space removed & unique' },
];

export const invalidEmailTestCases = [
    { email: 'testtestov@yopmail.com', error: 'Email already exists.', description: 'Duplicate email address' },
    { email: 'invalidemail', error: 'Wrong email format', description: 'Missing @ symbol' },
    { email: 'invalid@.com', error: 'Wrong email format', description: 'Missing domain name' },
    { email: 'invalid@domain', error: 'Wrong email format', description: 'Missing TLD' },
    { email: 'invalid@@domain.com', error: 'Wrong email format', description: 'Double @ symbol' },
    { email: 'invalid @domain.com', error: 'Wrong email format', description: 'Space inside email' },
    { email: 'user@domain..com', error: 'Wrong email format', description: 'Double dot in domain' },
    { email: '.user@domain.com', error: 'Wrong email format', description: 'Leading dot in local part' },
    { email: 'user.@domain.com', error: 'Wrong email format', description: 'Trailing dot in local part' },
    { email: 'user..name@domain.com', error: 'Wrong email format', description: 'Consecutive dots in local part' },
    { email: 'user@-domain.com', error: 'Wrong email format', description: 'Domain starts with hyphen' },
    { email: 'user@domain-.com', error: 'Wrong email format', description: 'Domain ends with hyphen' },
    { email: 'user@domain_name.com', error: 'Wrong email format', description: 'Underscore in domain' },
    { email: 'user@domain.com.', error: 'Wrong email format', description: 'Trailing dot in domain' },
    { email: '', error: 'Required', description: 'Empty email field' },
    {
        email: `${'a'.repeat(65)}@domain.com`,
        description: 'Exceeds max local part length',
    },
    { email: 'user@domain.com<script>', error: 'Wrong email format', description: 'XSS attempt' },
    { email: 'user@domain.com; DROP TABLE users;', error: 'Wrong email format', description: 'SQL injection attempt' },
];


export const xometrySignUpData = {
    fullName: 'R A',
    jobTitle: 'QA',
    phone: '1234567890',
};