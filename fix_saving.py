import re

file_path = r'd:\on going projects\Research Project\Research Project 1\frontend\src\pages\student\StudentDashboard.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Helper to build the student payload string
def build_payload(role_model):
    # Using double backslashes for the template literal dollar sign to avoid python interpolation
    return f'{{ ...payload, createdById: user.id, createdByName: profileData?.firstName ? `${{profileData.firstName}} ${{profileData.lastName || ""}}`.trim() : user.name, studentId: user.id, studentName: profileData?.firstName ? `${{profileData.firstName}} ${{profileData.lastName || ""}}`.trim() : user.name, departmentId: profileData?.departmentId, departmentName: profileData?.departmentName, createdByModel: "{role_model}" }}'

# Update Journal handler
content = re.sub(r'const jPayload = \{ \.\.\.payload, studentId: user\.id, studentName: profileData\?\.firstName \? `\$\{profileData\.firstName\} \$\{profileData\.lastName \|\| ""\}`\.trim\(\) : user\.name, departmentId: profileData\?\.departmentId, departmentName: profileData\?\.departmentName, createdByModel: "Student" \};',
    'const jPayload = ' + build_payload("Student") + ';', content)

# Update Patent handler
content = re.sub(r'const pPayload = \{ \.\.\.payload, studentId: user\.id, studentName: profileData\?\.firstName \? `\$\{profileData\.firstName\} \$\{profileData\.lastName \|\| ""\}`\.trim\(\) : user\.name, departmentId: profileData\?\.departmentId, departmentName: profileData\?\.departmentName, createdByModel: "Student" \};',
    'const pPayload = ' + build_payload("Student") + ';', content)

# Update Copyright handler
content = re.sub(r'const cPayload = \{ \.\.\.payload, studentId: user\.id, studentName: profileData\?\.firstName \? `\$\{profileData\.firstName\} \$\{profileData\.lastName \|\| ""\}`\.trim\(\) : user\.name, departmentId: profileData\?\.departmentId, departmentName: profileData\?\.departmentName, createdByModel: "Student" \};',
    'const cPayload = ' + build_payload("Student") + ';', content)

# Update Grant handler
content = re.sub(r'const gPayload = \{ \.\.\.payload, studentId: user\.id, studentName: profileData\?\.firstName \? `\$\{profileData\.firstName\} \$\{profileData\.lastName \|\| ""\}`\.trim\(\) : user\.name, departmentId: profileData\?\.departmentId, departmentName: profileData\?\.departmentName, createdByModel: "Student" \};',
    'const gPayload = ' + build_payload("Student") + ';', content)

# Update Achievement handler
content = re.sub(r'achievedByType: "Student",\n\s*achievedBy: user\?\.id,', 
    'achievedByType: "Student",\n          achievedBy: user?.id,\n          createdById: user?.id,\n          createdByModel: "Student",', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Saving logic fixed in StudentDashboard.jsx")
